const mongoose =require('mongoose');
const category = require('./categoryModel');

const subCategorySchema =mongoose.Schema({

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
    subCategoryName: {
        type: String,
        required: true,
    },
})

const Subcategory = mongoose.model('subCategory', subCategorySchema)

module.exports = Subcategory;