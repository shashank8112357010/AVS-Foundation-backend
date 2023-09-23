const express = require('express')
const route = express()
const { createCategory, getCategory  } = require('../Controller/category');

const {validate} = require('../Middleware/validate');
const { createCategoryValidation } = require('../Validators/category');

route.post('/createcategory' , validate(createCategoryValidation), createCategory);
route.get('/getcategory', getCategory)


module.exports = route
