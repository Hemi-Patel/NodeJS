const express =require('express');
const { blogHome, addBlog, viewBlog, insertBlog } = require('../controllers/blogCtrl');
const blog= require('../model/blogModel')
const routes=express.Router();


routes.get('/', blogHome);

routes.get('/createBlog', addBlog);

routes.post("/createBlog", blog.imageUpload, insertBlog);

routes.get('/viewBlog',viewBlog )

module.exports=routes;