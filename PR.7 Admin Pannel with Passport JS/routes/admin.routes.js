const express = require('express');

const routes = express.Router();

const ctrl = require('../controller/adminCtrl');

const Admin = require('../model/adminModel');
const passport = require('../config/localStrategy');

routes.use('/blog',passport.checkAdmin, require('./blog.routes'));

routes.get('/', ctrl.dashboard)

routes.get('/addAdmin', ctrl.addAdmin);

routes.get('/viewAdmin', ctrl.viewAdmin);

routes.post('/insertAdmin', Admin.uploadAdminImage, ctrl.insertAdmin);

routes.get('/deleteAdmin/:AdminId', ctrl.deleteAdmin);

routes.get('/editAdmin/:AdminId', ctrl.editAdmin);

routes.post('/updateAdmin/:AdminId', Admin.uploadAdminImage, ctrl.updateAdmin);

routes.get('/viewSingle/:AdminId', ctrl.viewSingle);

routes.get('/changePassword', ctrl.changePasswordPage);

routes.post('/changePassword',ctrl.changePassword);

routes.get('/viewProfile',ctrl.viewProfile)


module.exports = routes;