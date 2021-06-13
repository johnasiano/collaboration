var router = require('express').Router();
var { celebrate } = require('celebrate'); 
var moment = require('moment');
const db = require('../models');
var helper = require('../helper');

const category_to_tree = (arr) => {
    let arrMap = new Map(arr.map(item => [item.id, item]));
    let tree = [];
  
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
  
      if (item.parentID) {
        let parentItem = arrMap.get(item.parentID);
  
        if (parentItem) {
          let { children } = parentItem;
  
          if (children) {
            parentItem.children.push(item);
          } else {
            parentItem.children = [item];
          }
        }
      } else {
        tree.push(item);
      }
    }  
    return tree;
}

router.get('/get', async (req, res, next) => { 
    try {
        let categories = await db.category.findAll({
            attributes: ['id', ['text', 'title'], 'parentID', 'level', ['id', 'href']],
        });        

        // const _nav_tree = category_to_tree(categories)
        res.json({
            allCategories: categories,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
