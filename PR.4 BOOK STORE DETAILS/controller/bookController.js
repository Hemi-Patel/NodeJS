const db = require('../config/db');
const book = require('../model/bookModel');
const fs=require('fs');
const path=require('path')

module.exports.addbook = (req, res) => {
    return res.render("addBook");
};

module.exports.savebook = async (req, res) => {
    let isbnno = Math.floor(Math.random() * 100000000000);
    let Book = new book({
        image: book.imagePath + "/" + req.file.filename,
        title: req.body.title,
        author: req.body.author,
        isbnnum: isbnno,
        gener: req.body.gener,
        total: req.body.total
    });
    await book.create(Book);
    return res.redirect("/viewBook");
};

module.exports.viewbook = async (req, res) => {
    let books = await book.find();
    return res.render("viewBook",{books});
};

module.exports.deletebook = async (req, res) => {
    let singleBook = req.query.bookId;
    let singleObj = await book.findById(singleBook);
    if (singleObj.image) {
        let imgPath = path.join(__dirname,"../public", singleObj.image);
        await fs.unlinkSync(imgPath);
    }
    await book.findByIdAndDelete(singleBook);
    return res.redirect('/')
}
module.exports.viewSingle=async(req,res)=>{
    let singleBook = req.query.bookId;
    let singleObj = await book.findById(singleBook);
    return res.render("singleBook", {singleObj})
}
module.exports.editBook=async(req,res)=>{
    let index = req.query.bookId;
    let objBook=await book.findById(index);
    return res.render("editBook",{objBook,bookid:index})
}
module.exports.updateBook=async(req,res)=>{
    if(req.file){
            req.body.image=book.imagePath+"/"+req.file.filename;
            let oldImage=await book.findById(req.query.bookId);
            let fullPath=path.join(__dirname,'../public',oldImage.image)
            await fs.unlinkSync(fullPath);
    }
    else{
        let oldImage=await book.findById(req.query.bookId);
        req.body.image=oldImage.image;
    }

    await book.findByIdAndUpdate(req.query.bookId, req.body);
    return res.redirect('/');
}