
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const imagePath = '/uploads/BlogImages'

const blogSchema = mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:Array,
        required:true
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})
blogSchema.statics.uploadBlogImage = multer({ storage }).single('image');
blogSchema.statics.blogImagePath = imagePath;

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;