var router = require('express').Router();
var { celebrate } = require('celebrate');
const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await db.users.findAll({
      where: {
        role: 'user'
      }
    })
    
    res.json({
      users: users
    });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
})

router.post('/update', async (req, res, next) => {
  try {
    let isExist = await db.users.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (isExist&&isExist.id!==req.body.id) {
      res.json({
        state: 'failed',
        message: 'The this email already exists.'
      })
    } else {
      await db.users.update({
        email: req.body.email,
        name: req.body.name
      }, {
        where: {
          id: req.body.id
        }
      });
      
      let updateUser = await db.users.findOne({
        where: {
          id: req.body.id,
        }
      });

      res.json({
        state: 'success',
        user: updateUser
      })
    }    
  } catch (error) {
    next(error);
  }
})

router.get('/delete/:userId', async (req, res, next) => {
  try {
    
    await db.stockin.destroy({ where: { userId: req.params.userId }});
    await db.stockout.destroy({ where: { userId: req.params.userId}});
    await db.inventory.destroy({ where: { userId: req.params.userId}});
    await db.notification.destroy({ where: { userId: req.params.userId}});

    const user = await db.users.findOne({
      where: {
        id: req.params.userId,
      }
    });
    if (user) {
      await db.users.destroy({ where: { id: req.params.userId } });
      const users = await db.users.findAll({
        where: {
          role: 'user'
        }
      })      
      res.json({ 
        state: 'success',
        users: users
      });
    } else {
      res.json({ 
        state: 'failed',
        message: 'User do not exist' 
      });
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
