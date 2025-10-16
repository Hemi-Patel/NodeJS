
const mongoose = require('mongoose');

const multer = require('multer');

const path=require('path')

const CategoryImagePath = '/uploads/categoryImages'

const categorySchema = mongoose.Schema({

    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', CategoryImagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})
categorySchema.statics.uploadCategoryImage = multer({ storage }).single('image');
categorySchema.statics.CategoryImagePath = CategoryImagePath;

const category = mongoose.model('category', categorySchema)

module.exports = category;

