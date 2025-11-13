const express =require('express');
const routes=express.Router();
const imageUpload =require ('../Middleware/uploadImage');
const verifyToken=require('../Middleware/verifyToken');
const verifyRole=require('../Middleware/verifyRole');
const { LoginEmployee, ViewProfileEmployee, EditProfile } = require('../Controller/EmployeeCtrl');

routes.post('/loginEmployee',LoginEmployee);
routes.get('/viewProfile',verifyToken,verifyRole('Employee'),ViewProfileEmployee);
routes.put('/editProfile',verifyToken,verifyRole('Employee'),imageUpload.single('profile'),EditProfile);


module.exports=routes;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2OTE1Y2ViYzA1NTI3MTVjOTVhN2QzZTciLCJpYXQiOjE3NjMwMzgzNDN9.SZaEQBN66HzYGCGngccMTWNsI9sA22SE5TXyHROT524