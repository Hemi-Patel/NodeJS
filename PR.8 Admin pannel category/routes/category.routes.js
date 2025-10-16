const express = require('express');
const { AddCategoryPage, insertCategory, ViewCategories, DeleteCategories, EditCategoryPage, updateCategory } = require('../controller/categoryCtrl');

const categoryModel = require('../model/categoryModel')

const routes = express.Router();

routes.get("/addCategory", AddCategoryPage);

routes.post('/insertCategory', categoryModel.uploadCategoryImage, insertCategory);

routes.get('/viewCategory', ViewCategories);

routes.get('/deleteCategory/:C_ID', DeleteCategories);

routes.get('/editCategory/:C_ID', EditCategoryPage);

routes.post('/updateCategory/:C_ID', categoryModel.uploadCategoryImage, updateCategory);



module.exports = routes;