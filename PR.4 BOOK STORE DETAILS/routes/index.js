const express = require('express');
const routes = express.Router();
const ctrl=require('../controller/bookController');
const db = require('../config/db')
const book = require('../model/bookModel');

routes.get("/",ctrl.viewbook);
routes.get("/addbook", book.imageUpload,ctrl.addbook);
routes.post("/savebook",book.imageUpload,ctrl.savebook);
routes.get("/viewbook",ctrl.viewbook)
routes.get("/deletebook",ctrl.deletebook);
routes.get("/viewSingle",ctrl.viewSingle);
routes.get("/editBook",ctrl.editBook);
routes.post("/updateBook",book.imageUpload,ctrl.updateBook)
module.exports = routes;
