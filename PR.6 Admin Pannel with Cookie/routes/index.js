const express =require('express');

const routes=express.Router();

const {loginAdmin, showLogin, logoutAdmin, forgotPassword, sendOTP, verifyOTP, resetPassword, resetPasswordPage } = require('../controller/indexCtrl');


const { route } = require('./admin.routes');

routes.use('/admin',require('./admin.routes'));

routes.get('/',showLogin);

routes.post('/',loginAdmin);

routes.get('/logoutAdmin',logoutAdmin);

routes.get('/forgotPassword',forgotPassword);

routes.post('/send-email',sendOTP);

routes.post('/verify-otp',verifyOTP);

routes.post('/resetPassword',resetPassword)

routes.get('/resetPassword',resetPasswordPage);


module.exports=routes;

