const express = require('express');

const { AddBlog, insertBlog, ViewBlog, DeleteBlog, EditBlog, UpdateBlog, ReadBlog } = require('../controller/BlogCtrl');

const BlogModel = require("../model/blogModel")

const routes = express.Router();

routes.get("/addBlog", AddBlog);

routes.post("/insertBlog", BlogModel.uploadBlogImage, insertBlog)

routes.get("/viewBlog", ViewBlog);

routes.get("/deleteBlog/:BlogID", DeleteBlog);

routes.get("/editBlog/:BlogID", EditBlog);

routes.post("/UpdateBlog/:BlogID",BlogModel.uploadBlogImage,UpdateBlog)

routes.get("/ReadBlog/:BlogID", ReadBlog);


module.exports = routes;