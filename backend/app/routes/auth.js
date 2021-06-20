var router = require('express').Router();
var { celebrate } = require('celebrate'); 
var moment = require('moment');
var validator = require('../validators/auth');
const db = require('../models');
var helper = require('../helper');
const axios = require('axios');
const bcrypt = require("bcryptjs")

router.post('/signup', celebrate(validator.signup), async (req, res, next) => {
  try {
    const saltRounds = 10;
    bcrypt.genSalt( saltRounds, function (err, salt) {
      if (err) {

      } else {
        bcrypt.hash(req.body.password, salt, async function(err, hashed_password) {
          if (err) {
            throw err
          } else {
            let user = await db.users.findOne({
              where: {
                email: req.body.email,
                role: req.body.role
              }
            });
            if (!user) {
              user = await db.users.create({
                name: req.body.name,
                email: req.body.email,  
                password: hashed_password,
                role: req.body.role,
                last_login: moment().format('DD/MM/YYYY HH:MM')
              })
              res.json({
                success: true,
                message: 'Regular account register successful',
                email: req.body.email
              })
            } else {
              res.json({
                success: false,
                message: 'The user already exists.'
              })
            }            
          }
        })
      }
    })
  } catch (error) {
    next(error);
  }
});

router.post('/signin', celebrate(validator.signin), async (req, res, next) => {
  try {
    
    let user = await db.users.findOne({
      where: {
        email: req.body.email,
        role: req.body.role
      }
    });

    if (!user) {
      res.json({
        state: 'failed',
        message: 'Oops! Username is incorrect.'
      })
    } else {
      bcrypt.compare(req.body.password, user.password, async function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          res.json({
            success: false,
            message: 'Oops! Password is incorrect.'
          })
        } else {
          user.last_login = moment().format('DD/MM/YYYY HH:MM');
          await user.save();
          res.json({
            success: true,
            user,
            accessToken: helper.getAccessToken(user.toJSON())
          })                    
        }
      })
    } 
  } catch (error) {
    next(error);
  }
});


router.post('/google/signup', celebrate(validator.googleSignup), async (req, res, next) => {
  try {
    
    let socialUser = await db.sociallogin.findOne({
      where: {
        email: req.body.email
      }
    });

    if (socialUser) {
      res.json({
        state: 'failed',
        message: 'Oops! Already exist google account!'
      })
    } else {
      let user = await db.users.create({
        name: req.body.name,
        email: req.body.email,  
        password: 'google-login',
        role: req.body.role,
        last_login: moment().format('DD/MM/YYYY HH:MM')
      })

      await db.sociallogin.create({
        userId: user.id,
        email: req.body.email,  
        type: 'google',
        content: req.body.content
      })

      res.json({
        success: true,
        user,
        accessToken: helper.getAccessToken(user.toJSON())
      })    
    } 
  } catch (error) {
    next(error);
  }
});

router.post('/google/signin', celebrate(validator.googleSignin), async (req, res, next) => {
  try {
    
    let socialUser = await db.sociallogin.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!socialUser) {
      let user = await db.users.create({
        name: req.body.name,
        email: req.body.email,  
        password: 'google-login',
        role: req.body.role,
        last_login: moment().format('DD/MM/YYYY HH:MM')
      })

      await db.sociallogin.create({
        userId: user.id,
        email: req.body.email,  
        type: 'google',
        content: req.body.content
      })

      res.json({
        success: true,
        user,
        accessToken: helper.getAccessToken(user.toJSON())
      }) 
    } else {
      let user = await db.users.findOne({
        where: {
          id: socialUser.userId,
          role: 'user'
        }
      });
      user.last_login = moment().format('DD/MM/YYYY HH:MM');
      await user.save();
      res.json({
        success: true,
        user,
        accessToken: helper.getAccessToken(user.toJSON())
      })    
    } 
  } catch (error) {
    next(error);
  }
});

router.post('/passchange', async (req, res, next) => {
  try {

    let user = await db.users.findOne({
      where: {
        id: req.body.id,
      }
    });

    if (!user) {
      res.json({
        state: 'failed',
        message: 'Oops! Username is incorrect.'
      })
    } else {
      const saltRounds = 10;
      bcrypt.genSalt( saltRounds, function (err, salt) {
        if (err) {

        } else {
          bcrypt.hash(req.body.newPass, salt, async function(err, hashed_password) {
            if (err) {
              throw err
            } else {
              // console.log(hashed_password)
              await user.update({password: hashed_password});
              res.json({
                state: 'success',
                message: 'Successfully saved password changes!',
              })          
            }
          })
        }
      })
    } 
  } catch (error) {
    next(error);
  }
});


router.post('/forgot', async (req, res, next) => {

  try {
    let user = await db.users.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (!user) {
      res.json({
        state: 'failed',
        message: 'Oops! Username is incorrect.'
      })
    } else {
      
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < 10; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      const saltRounds = 10;
      bcrypt.genSalt( saltRounds, function (err, salt) {
        if (err) {

        } else {
          bcrypt.hash(result, salt, async function(err, hashed_password) {
            if (err) {
              throw err
            } else {
              // console.log(hashed_password)
              await user.update({password: hashed_password});

              // let fromEmail = 'info@oneconnxt.com';
              // let toEmail = req.body.email;

              // const subject = 'Reset Password';
              // const body = `Hi ${user.name}\n
              // We heard that you lost your password. Sorry about that! \n
              // But don’t worry! You can use this password: ${result} \n
              // After login with this password, please change your password again to protect your account.
              // Thanks,`;


              // // let testAccount = await nodemailer.createTestAccount();
              // sendEmail(toEmail, fromEmail, subject, body).then(result => {
              //   // console.log('Message sent: ', result);
              //   res.json({ 
              //     state: 'success',
              //     message: 'It was sent successfully!'
              //   });
              // }).catch(err => {
              //   console.log(err);
              //   res.json({ 
              //     state: 'failed',
              //     message: err
              //   });
              // });
            }
          })
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
