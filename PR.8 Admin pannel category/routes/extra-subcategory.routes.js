const express=require('express');
const { addExtraSubCategory, viewExtraSubCategory, insertExtraSubCategory, deleteExtraSubCategory, editExtraSubCategoryPage, editExtraSubCategory, FindSubCategories } = require('../controller/extraSubCategoryCtrl');

const routes=express.Router();

routes.get("/addExtraSubCategory",addExtraSubCategory);

routes.post('/insertExtraSubCategory',insertExtraSubCategory);

routes.get("/viewExtraSubCategory",viewExtraSubCategory);

routes.get("/deleteExtraSubCategory/:id",deleteExtraSubCategory);

routes.get("/editExtraSubCategory/:id",editExtraSubCategoryPage);

routes.post("/editExtraSubCategory/:id",editExtraSubCategory);

routes.get("/SubCategory/",FindSubCategories);


module.exports=routes;