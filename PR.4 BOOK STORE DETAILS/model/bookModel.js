const mongoose =require ('mongoose');
const multer=require('multer');
const path = require('path');
const Images="./images"

const bookModel=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    isbnnum:{
        type:Number,
        required:true
    },
    gener:{
        type:[String],
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public", Images));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})
bookModel.statics.imageUpload = multer({ storage }).single('image');
bookModel.statics.imagePath = Images;

const book=mongoose.model('bookDetails',bookModel);
module.exports=book;