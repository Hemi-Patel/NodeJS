const express =require('express');
const routes=express.Router();
const imageUpload =require ('../Middleware/uploadImage');
const verifyToken=require('../Middleware/verifyToken');
const verifyRole=require('../Middleware/verifyRole');
const { LoginManger, ViewProfileManger, EditProfile, AddEmployee, DeleteEmployee, EditEmployee, ViewAllEmployee, ViewSingleEmployee } = require('../Controller/ManagerCtrl');

routes.post('/loginManager',LoginManger);
routes.get('/viewProfile',verifyToken,verifyRole('Manager'),ViewProfileManger);
routes.put('/editProfile',verifyToken,verifyRole('Manager'),imageUpload.single('profile'),EditProfile);

routes.post('/addEmployee',verifyToken,verifyRole('Manager','Admin'),imageUpload.single('profile'),AddEmployee);
routes.delete('/deleteEmployee/:id',verifyToken,verifyRole('Manager','Admin'),DeleteEmployee);
routes.put('/editEmployee/:id',verifyToken,verifyRole('Manager','Admin'),imageUpload.single('profile'),EditEmployee);
routes.get('/viewSingleEmployee/:id',verifyToken,verifyRole('Manager','Admin'),ViewSingleEmployee);
routes.get('/viewAllEmployee',verifyToken,verifyRole('Admin','Manager'),ViewAllEmployee);

module.exports=routes;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2OTE1YWVjMzY2ZmIyMjdiYWRhZThjMTgiLCJpYXQiOjE3NjMwMzU0MDR9.jEEtY7KoWYTmX5gUEUBcHLZ17aKyJF1_cZ6BRE2Xc3g