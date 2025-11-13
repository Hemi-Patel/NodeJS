const express =require('express');
const routes=express.Router();
const imageUpload =require ('../Middleware/uploadImage');
const verifyToken=require('../Middleware/verifyToken');
const verifyRole=require('../Middleware/verifyRole')
const { RegisterUser, LoginUser, ViewProfile, DeleteAdmin, EditAdmin, ViewAllUser, AddManager, DeleteManager, EditManager, ViewAllManager, ViewSingleManger } = require('../Controller/AdminCtrl');


routes.post('/register',imageUpload.single('profile'),RegisterUser);
routes.post('/login',LoginUser);
routes.get('/viewProfile',verifyToken,ViewProfile);
routes.delete('/deleteAdmin/:id',verifyToken,verifyRole('Admin'),DeleteAdmin);
routes.put('/editAdmin/:id',verifyToken,verifyRole('Admin'),imageUpload.single('profile'),EditAdmin);
routes.get('/viewAllUser',verifyToken,verifyRole('Admin','Manager'),ViewAllUser);

routes.post('/addManager',verifyToken,verifyRole('Admin'),imageUpload.single('profile'),AddManager);
routes.delete('/deleteManager/:id',verifyToken,verifyRole('Admin'),DeleteManager);
routes.put('/editManager/:id',verifyToken,verifyRole('Admin'),imageUpload.single('profile'),EditManager);
routes.get('/viewSingleManager/:id',verifyToken,verifyRole('Admin'),ViewSingleManger);
routes.get('/viewAllManager',verifyToken,verifyRole('Admin'),ViewAllManager);

module.exports=routes;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2OTE1OGM2YzQyNjlmOTQ1NzRkODRiZTkiLCJpYXQiOjE3NjMwMjI4NjF9.2E5Fq3Y7FjAdgPiF50E9wbAYnc1AlDiyzDMPggwGmXY