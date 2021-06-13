const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./app/routes');
const { isCelebrate } = require('celebrate');
const app = express();
var cron = require('cron').CronJob;

// const { checkNotificationList } = require('./app/check_notification_cron');

// var job = new cron('0 */60 * * * *', ()=>{
//   checkNotificationList();
// })
// job.start();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(fileUpload());

app.use('/api', router);

app.use('/api', (error, _, res, __) => {
  if (isCelebrate(error)) {
    let message = error.joi.details[0].message;
    res.status(error.code || 403).json({
      'error': 'validate',
      'message': message.split('"').join('')
    });
  } else if (error.type == 'workflow') {
    res.status(error.code || 400).json({
      'error': 'workflow',
      'message': error.message
    });
  } else {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

module.exports = app;
