require('dotenv').config();
const db = require('./models');
const { sendEmail } = require('./helper');

async function connect() {
  await db.sequelize.authenticate();
}

exports.checkNotificationList = async () => {
  try {

    await connect();
    await db.sequelize.sync();

    let notifications = await db.notification.findAll({
      where: {
        user_notify: 1
      }
    });
    notifications.forEach(item=>{
        console.log('notifications', item.userId);
        item.products_info.forEach(async product=>{
            const product_inventory = await db.inventory.findOne({
                where: {
                  userId:  item.userId,
                  productId: product.id
                },
            });
              
            const user_info = await db.users.findOne({
                where: {
                    id: item.userId
                }
            })

            const product_info = await db.products.findOne({
                where: {
                    id: product.id
                }
            })
            if (product_inventory) {
              console.log(product_inventory.qty);
                if (product_inventory.qty < product.lowStock) {
                    const message = `Dear, ${user_info.name}`+'\n\n\r\r'+`Your product is out of stock.`+'\n\r'+`- Product Info: `+'\r\n'+`Name: ${product_info.name} ->, Stock: ${product_inventory.qty}`;
                    
                    let fromEmail = 'mailer@dentalstock.com.au';
                    let fromName = 'dentalstock.com.au';
                    let toEmail = user_info.email;
                    let title = 'Low QTY threshold Report'
                    console.log(fromEmail, toEmail, title, message);
                    sendEmail(toEmail, fromEmail, fromName, title, message).then(result => {
                      console.log('Message sent: ');
                    }).catch(err => {
                      console.log('Message error (cron): ', err);
                    });
                }
            }
        })
    });

  } catch (error) {
    console.log(error);
  }
}

function convertHtml(items) {
  var html = '';
  for (var item of items) {
    html += '<div>' + item.set_code + ' :  ' + item.stock + '</div>';
  }
  return html;
}