const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const sgApiKey = process.env.SENDGRID_API_KEY;
let jwt = require('jsonwebtoken');
let jwt_token = process.env.JWT_SECRET || "secret";
var FileReader = require('filereader')

exports.getAccessToken = ({id, provider}) => {
  return jwt.sign({id, provider}, jwt_token, {expiresIn: '1y'});
}

exports.verifyToken = (accessToken) => {
  return jwt.verify(accessToken, jwt_token);
}

exports.sendEmail = async (toEmail, fromEmail, fromName, subject, emailContent) => {
  sgMail.setApiKey(sgApiKey);
  const msg = {
      from: fromEmail,
      fromname: fromName,
      to: toEmail,
      subject: subject,
      text: emailContent, // plain text body
      // html: `<div>${emailContent}</div>`
  };
  return sgMail.send(msg);
};

exports.sendEmailAttachments = async (toEmail, fromEmail, fromName, subject, emailContent, attachments) => {
  sgMail.setApiKey(sgApiKey);
  const _attachments = attachments.map((element,index)=>{
    let _dataBase64 = element.data_url;
    let imageType = '';
    if (String(_dataBase64).includes('/png')) {
      imageType = 'png';
    }
    if (String(_dataBase64).includes('/jpg')) {
      imageType = 'jpg';
    }
    if (String(_dataBase64).includes('/jpeg')) {
      imageType = 'jpg';
    }
    _dataBase64 = _dataBase64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    
    return {
      content: _dataBase64,
      filename: `${index}.${imageType}`,
      type: `application/${imageType}`,
      disposition: "attachment"
    }
  })
  const msg = {
      from: fromEmail,
      fromname: fromName,
      to: toEmail,
      subject: subject,
      text: emailContent, // plain text body
      attachments:_attachments
  };
  return sgMail.send(msg);
};

exports.sendEmailAttachmentPDF = async (toEmail, fromEmail, fromName, subject, emailContent, pdfData) => {
  sgMail.setApiKey(sgApiKey);
  // console.log(toEmail, fromEmail, subject, emailContent)
  let attachment = pdfData.replace(`data:application/pdf;filename=generated.pdf;base64,`, "");
  const msg = {
    from: fromEmail,
    fromname: fromName,
    to: toEmail,
    subject: subject,
    text: emailContent, // plain text body
    attachments:[
      {
        content: attachment,
        filename: `Report.pdf`,
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  };
  return sgMail.send(msg);
 
} 
  