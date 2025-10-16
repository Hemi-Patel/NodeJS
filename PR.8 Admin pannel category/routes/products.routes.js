
const express = require('express');
const { AddProductPage, AddProduct, FindProducts, ViewProduct, deleteProduct, editProductPage, EditProduct, ViewSingleProduct } = require('../controller/productCtrl');
const productModel = require('../model/productModel');
const routes = express.Router();


routes.get("/AddProduct", AddProductPage)
routes.post ("/insertProduct",productModel.uploadProductImage,AddProduct);
routes.get("/Products/",FindProducts);

routes.get('/ViewProduct',ViewProduct);
routes.get('/deleteProduct/:id',deleteProduct);
routes.get('/editProduct/:id',editProductPage);
routes.get('/ViewSingleProduct/:id',ViewSingleProduct);
routes.post ("/EditProduct/:id",productModel.uploadProductImage,EditProduct);

module.exports = routes;