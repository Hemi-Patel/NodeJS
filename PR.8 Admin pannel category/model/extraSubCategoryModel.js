const mongoose =require('mongoose');
const category = require('./categoryModel');
const subCategory=require('./subCategoryModel')

const ExtraSubCategorySchema =mongoose.Schema({

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategory',
    },
    ExtraSubcategoryName: {
        type: String,
        required: true,
    },
})

const ExtraSubcategory = mongoose.model('ExtraSubCategory', ExtraSubCategorySchema)

module.exports = ExtraSubcategory;