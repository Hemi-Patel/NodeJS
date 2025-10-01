
const express = require('express');
const { ShowBlog, ViewSingleBlog } = require('../controller/websiteCtrl');

const routes = express.Router();

routes.get("/", ShowBlog);
routes.get("/singleBlog/:id", ViewSingleBlog);


module.exports = routes;