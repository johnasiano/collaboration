var router = require('express').Router();
var { celebrate } = require('celebrate');
var validator = require('../validators/product');
var moment = require('moment');
const db = require('../models');

const filterProduct = (products) => {
  products.sort((a, b) => {
    var x = a.qty
    var y = b.qty
    if (x > y) {return 1 }
    if (x < y) { return -1 }
    return 0
  })
  return products;
}

router.get('/all', async (req, res, next) => {
  try {
        
    const products = await db.products.findAll({
    })
    
    if (products) {
      res.json({
        state: 'success',
        products: products
      });
    } else {
      res.json({
        state: 'failed'
      });
    }
    
  } catch (error) {
    next(error);
  }
})

router.post('/update', async (req, res, next) => {
  try {
    let isExist = await db.products.findOne({
      where: {
        name: req.body.name,
      }
    });

    if (isExist&&isExist.id!==req.body.id) {
      res.json({
        state: 'failed',
        message: 'The this product already exists.'
      })
    } else {
      await db.products.update({
        name: req.body.name,
        description: req.body.description,
        supplier: req.body.supplier,
        supplier_code: req.body.supplier_code,
        categoryId: req.body.categoryId
      }, {
        where: {
          id: req.body.id
        }
      });
      
      let updateProduct = await db.products.findOne({
        where: {
          id: req.body.id,
        }
      });

      res.json({
        state: 'success',
        product: updateProduct
      })
    }    
  } catch (error) {
    next(error);
  }
})

router.get('/inventory', async (req, res, next) => {
  try {
    const user_inventory = await db.inventory.findAll({
      where: {
        userId: req.user.id
      },
    });
    
    const product_id = user_inventory.map(product=>product.productId);
    const user_products = await db.products.findAll({
      where:{
        id: {
          [db.Sequelize.Op.in]: product_id
        }
      }
    })

    const _user_products = user_products.map((product, index)=>{
      let inventory = user_inventory.find(item=>item.productId===product.id);
      return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "cost": inventory.cost,
        "supplier": product.supplier,
        "supplier_code": product.supplier_code,
        "categoryId": product.categoryId,
        "qty": inventory.qty
      }
    })
    
    const filter_product = filterProduct(_user_products);
    res.json({
      products: filter_product
    });
  } catch (error) {
    next(error);
  }
})


router.get('/get-stockin/:userId', async (req, res, next) => {
  try {
        
    const user_stockin = await db.stockin.findAll({
      where:{
        userId: req.params.userId
      }
    })
    
    if (user_stockin) {
      const product_infos = await db.products.findAll({})
      const result = user_stockin.map(item=>{
        let product_info = product_infos.find(product=>product.id==item.productId);
        return {
          product_info,
          qty_to_add: item.qty_to_add,
          cost: item.cost,
          purchase_date: item.purchase_date
        }
      })
      res.json({
        state: 'success',
        stockin: result
      });
    } else {
      res.json({
        state: 'failed'
      });
    }
    
  } catch (error) {
    next(error);
  }
})

router.get('/get-stockout/:userId', async (req, res, next) => {
  try {
        
    const user_stockout = await db.stockout.findAll({
      where:{
        userId: req.params.userId
      }
    })
    
    if (user_stockout) {
      const product_infos = await db.products.findAll({})
      const result = user_stockout.map(item=>{
        let product_info = product_infos.find(product=>product.id==item.productId);
        return {
          product_info,
          qty_to_remove: item.qty_to_remove,
          out_date: item.out_date
        }
      })
      res.json({
        state: 'success',
        stockout: result
      });
    } else {
      res.json({
        state: 'failed'
      });
    }
    
  } catch (error) {
    next(error);
  }
})

router.get('/product-inventory/:productId', async (req, res, next) => {
  try {
    const product_inventory = await db.inventory.findOne({
      where: {
        userId: req.user.id,
        productId: req.params.productId
      },
    });
    
    if (product_inventory) {
      res.json({
        state: 'success',
        inventory: product_inventory
      })
    } else {
      res.json({
        state: 'failed',
        message: 'Product do not exist'
      })
    }
  } catch (error) {
    next(error);
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const product = await db.products.findOne({
      where: {
        name: req.body.name
      }
    });
    if (!product) {
      const user_products = await db.products.create({
        name: req.body.name,
        description: req.body.description,
        supplier: req.body.supplier,
        supplier_code: req.body.supplier_code,
        categoryId: req.body.categoryId,    
      });
      const user_inventory = await db.inventory.create({
        userId: req.user.id,
        productId: user_products.id,
        cost: req.body.cost,
        qty: req.body.qty_to_add,
      });
      const user_transaction = await db.stockin.create({
        userId: req.user.id,
        productId: user_products.id,
        cost: req.body.cost,
        qty_to_add: req.body.qty_to_add,
        purchase_date: req.body.purchase_date
      });
      res.json({
        state: 'success',
        product: user_products,
        inventory: user_inventory
      });
    } else {
      res.json({ 
        state: 'failed',
        message: 'Product already exist' 
      });
    }    
  } catch (error) {
    next(error);
  }
})


router.post('/add', async (req, res, next) => {
  try {
    const product = await db.products.findOne({
      where: {
        name: req.body.name
      }
    });
    if (!product) {
      const product = await db.products.create({
        name: req.body.name,
        description: req.body.description,
        supplier: req.body.supplier,
        supplier_code: req.body.supplier_code,
        categoryId: req.body.categoryId,    
      });
      res.json({
        state: 'success',
        product: product
      });
    } else {
      res.json({ 
        state: 'failed',
        message: 'Product already exist' 
      });
    }    
  } catch (error) {
    next(error);
  }
})


router.post('/stockin', async (req, res, next) => {
  try {
    
    const user_inventory = await db.inventory.findOne({
      where: {
        productId: req.body.id,
        userId: req.user.id
      }
    });

    const stockin_history = await db.stockin.findAll({
      where: {
        userId: req.user.id,
        productId: req.body.id,
      },
    });

    const stockin = await db.stockin.create({
      userId: req.user.id,
      productId: req.body.id,      
      qty_to_add: req.body.qty_to_add,
      cost: req.body.cost,
      purchase_date: req.body.purchase_date
    });

    if (user_inventory) {
      let sum = Number(stockin_history.map(item=>item.cost).reduce((a,b)=>a+b));
      sum += req.body.cost;
      let averagePrice = Math.round(Number.parseFloat((sum/(stockin_history.length+1))));

      const update = {
        cost: averagePrice,
        qty: user_inventory.qty + req.body.qty_to_add,
      }
      await user_inventory.update(update);
      res.json({ 
        state: 'success',
      });
    } else {
      await db.inventory.create({
        userId: req.user.id,
        productId: req.body.id,
        qty: req.body.qty_to_add,
        cost: req.body.cost,
      });
      res.json({ 
        state: 'success',
      });
    }
  } catch (error) {
    next(error);
  }
})

router.post('/stockout', async (req, res, next) => {
  try {    
    const user_inventory = await db.inventory.findOne({
      where: {
        productId: req.body.id,
        userId: req.user.id
      }
    });
    
    if (user_inventory) {
      await db.stockout.create({
        userId: req.user.id,
        productId: req.body.id,
        qty_to_remove: req.body.qty_to_remove,
        out_date: moment().format('DD/MM/YYYY')
      });

      const update = {
        qty: user_inventory.qty - req.body.qty_to_remove,
      }
      await user_inventory.update(update);
      res.json({ 
        state: 'success',
      });
    } else {
      res.json({ 
        state: 'failed',
        message: 'Product do not exist' 
      });
    }
  } catch (error) {
    next(error);
  }
})

router.get('/suggestion', celebrate(validator.suggestion), async (req, res, next) => {
  try {
    const queryValue = `%${req.query.suggestion}%`;
    
    const products = await db.products.findAll({
      attributes: ['id', 'name', 'description', 'supplier', 'supplier_code', 'categoryId'],
      where: {
        [db.Sequelize.Op.or]: [{
          'name': {
            [db.Sequelize.Op.like]: queryValue
          }
        }, {
          'supplier_code': {
            [db.Sequelize.Op.like]: queryValue
          }
        }]
      }
    });
    if (products.length!=0) {      
      res.json({ 
        state: true,
        products: products
      });
    } else {
      res.json({ 
        state: false,
        message: 'Product do not exist' 
      });
    }

  } catch (error) {
    next(error);
  }
})

module.exports = router;
