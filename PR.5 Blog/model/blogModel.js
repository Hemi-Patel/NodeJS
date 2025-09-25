const mongoose =require ('mongoose');
const multer=require('multer');
const path = require('path');
const Images = "/uploads"

const blogModel=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:[String],
        required:true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../", Images));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})
blogModel.statics.imageUpload = multer({ storage }).single('image');
blogModel.statics.imagePath = Images;

const blog=mongoose.model('bloginfo',blogModel);
module.exports=blog;