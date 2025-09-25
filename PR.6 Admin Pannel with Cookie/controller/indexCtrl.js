

const Admin = require("../model/adminModel");
const bcrypt = require('bcrypt');
const { sendMail } = require("../config/mailMessage")

module.exports.showLogin = async (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.render('auth/login');
        } else {
            return res.redirect('/admin')
        }
    } catch (err) {
        console.log(err)
        return res.redirect('/admin')
    }

}

module.exports.loginAdmin = async (req, res) => {
    let admin = await Admin.findOne({ 'email': req.body.email });
    if (admin) {
        if (admin.email == req.body.email && await bcrypt.compare(req.body.password, admin.password)) {
            res.cookie('admin', admin)
            return res.redirect('/admin')
        }
        else{
            return res.redirect("/")
        }
    }
    else {
        return res.redirect('/');
    }
}
module.exports.logoutAdmin = async (req, res) => {
    res.clearCookie('admin');
    return res.redirect('/');
}

module.exports.forgotPassword = async (req, res) => {
    try {
        return res.render('auth/forgotPassword')
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}
module.exports.sendOTP = async (req, res) => {
    try {
        let adminEmail = await Admin.findOne({ email: req.body.email })
        if (!adminEmail) {
            return res.redirect("/forgotPassword");
        }
        
            let otp = Math.floor(Math.random() * 100000);
            let msg = {
                from: "hemipatel301@gmail.com",
                to: "hemipatel6498@gmail.com",
                subject: "Hello",
                html: `<p>Hello i am hemi</p><p>Your OTP is ${otp}`
            }
            await sendMail(msg);
            res.cookie('email', req.body.email)
            res.cookie('otp', otp)
            return res.render('auth/verifyOTP');
    }
    catch (err) {
        console.log(err);
        return res.redirect('/forgotPassword');
    }
}
module.exports.verifyOTP = async (req, res) => {
    let otp = req.cookies.otp;
    if (otp == req.body.otp) {
        res.clearCookie('otp')
        return res.render('auth/resetPassword');
    } else {
        return res.redirect('/');
    }
}
module.exports.resetPasswordPage=async(req,res)=>{
    try{
        return res.render('auth/resetPassword')
    }catch(err){
        console.log(err);
        return res.redirect("/");
    }
}
module.exports.resetPassword = async (req, res) => {
    try {
        let adminEmail = await Admin.findOne({ email: req.cookies.email })
        console.log(adminEmail);
        if (req.body.password == req.body.cpassword) {
            let hashPass = await bcrypt.hash(req.body.password, 10);
            console.log(hashPass);
            
            await Admin.findByIdAndUpdate(adminEmail._id, { password: hashPass })
            console.log("password changed");
            res.clearCookie('email')
            return res.redirect('/');
        } else {
            console.log("New Password and confirm password not match");
            res.redirect('/resetpassword');
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("/")
    }
}





