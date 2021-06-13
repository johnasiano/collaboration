var router = require('express').Router();
var helper = require('../helper');

// public routes
router.use('/stripe', require('./stripe'));

// authentication
router.use('/auth', require('./auth'));
router.use('/category', require('./category'));

router.use((req, res, next) => {
  const token = req.headers['authorization'];
  try {
    if (token == 'guest') {
      req.user = {
        id: 9999
      }
      next();
    } else {
      const user = helper.verifyToken(token);
      if (user) {
        req.user = user;
        next();
      } else {
        throw null;
      }
    }    
  } catch (error) {
    next({
      type: 'workflow',
      message: 'First you need to login'
    });
  }
});

// private routes

router.use('/product', require('./product'));
router.use('/users', require('./user'));
router.use('/notification', require('./notification'));
router.use('/report', require('./report'));

module.exports = router;