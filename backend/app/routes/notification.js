var router = require('express').Router();
var { celebrate } = require('celebrate');
const db = require('../models');

router.get('/get', async (req, res, next) => {
    try {
        let userNotify = await db.notification.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (userNotify) {
            res.json({
                state: 'success',
                notify: userNotify
            })
        } else {
            res.json({
                state: 'failed',
                msg: 'Sorry, Do not have notification'
            })
        }
    } catch (error) {
        next(error);
    }
});

router.post('/update', async (req, res, next) => {
  try {
    let isNotify = await db.notification.findOne({
        where: {
            userId: req.user.id
        }
    });

    if (!isNotify) {
        isNotify = await db.notification.create({
            userId: req.user.id,
            user_notify: req.body.user_notify,  
            products_info: req.body.products_info,
            supplier_notify: req.body.supplier_notify,
            supplier_info: req.body.supplier_info
        })        
        let updateNotify = await db.notification.findOne({
            where: {
                userId: req.user.id
            }
        });

        res.json({
            state: 'success',
            notify: updateNotify
        })
    } else {
        await db.notification.update({
            user_notify: req.body.user_notify,  
            products_info: req.body.products_info,
            supplier_notify: req.body.supplier_notify,
            supplier_info: req.body.supplier_info
        }, {
            where: {
                userId: req.user.id
            }
        });
        
        let updateNotify = await db.notification.findOne({
            where: {
                userId: req.user.id
            }
        });

        res.json({
            state: 'success',
            notify: updateNotify
        })
    }    
  } catch (error) {
    next(error);
  }
})

module.exports = router;
