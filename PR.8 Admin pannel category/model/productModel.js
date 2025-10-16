
const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const imagePath = '/uploads/ProductImages'

const ProductSchema = mongoose.Schema(
    {
        p_name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        p_image: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subCategory',
        },
        extraSubcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExtraSubCategory',
        }

    }
)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})
ProductSchema.statics.uploadProductImage = multer({ storage }).single('p_image');
ProductSchema.statics.ProductimagePath = imagePath;

const product = mongoose.model('product', ProductSchema);

module.exports = product;