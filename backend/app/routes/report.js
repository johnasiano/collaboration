var router = require('express').Router();
const db = require('../models');
const { sendEmail, sendEmailAttachmentPDF } = require('../helper')

router.post('/sendpdf', async (req, res, next) => {
  try {
      
    let user = await db.users.findOne({
        where: {
            id: req.user.id
        }
    });
    let fromEmail = 'mailer@dentalstock.com.au';
    let fromName = 'dentalstock.com.au';
    let toEmail = user.email;
    sendEmailAttachmentPDF(toEmail, fromEmail, fromName, req.body.title, req.body.message, req.body.pdfData).then(result => {
        res.json({ 
          success: 'success',
          message: 'It was sent successfully!'
        });
      }).catch(err => {
        console.log(err);
        res.json({ 
          success: 'failed',
          message: 'Sorry, Failed!'
        });
      });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
})

router.post('/sendmsg', async (req, res, next) => {
    try {
        
      let fromEmail = 'mailer@dentalstock.com.au';
      let fromName = 'dentalstock.com.au';
      let toEmail = req.body.email;
      sendEmail(toEmail, fromEmail, fromName, req.body.title, req.body.message).then(result => {
          res.json({ 
            success: 'success',
            message: 'It was sent successfully!'
          });
        }).catch(err => {
          console.log(err.response.body.errors);
          res.json({ 
            success: 'failed',
            message: err.response.body
          });
        });
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  })

module.exports = router;