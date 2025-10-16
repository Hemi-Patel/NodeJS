const express=require('express');
const { AddSubcategoryPage, viewSubCategory, insertSubCategory, deleteSubCategory, editSubCategoryPage, editSubCategory } = require('../controller/subCategoryCtrl');
const routes=express.Router();

routes.get("/addSubCategory",AddSubcategoryPage);

routes.post('/insertSubCategory',insertSubCategory)

routes.get("/viewSubCategory",viewSubCategory);

routes.get("/deleteSubCategory/:SubCategory_ID",deleteSubCategory);

routes.get("/editSubCategory/:SubCategory_ID",editSubCategoryPage);

routes.post("/editSubCategory/:SubCategory_ID",editSubCategory);

module.exports=routes;