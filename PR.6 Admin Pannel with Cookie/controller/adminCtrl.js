const Admin = require('../model/adminModel');

const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.dashboard = async (req, res) => {
    let admin = req.cookies.admin;
    if (req.cookies.admin && req.cookies.admin._id) {

        return res.render('dashboard', { admin });
    } else {
        return res.redirect('/')
    }
}
module.exports.addAdmin = async (req, res) => {
    let admin = req.cookies.admin;
    if (req.cookies.admin && req.cookies.admin._id) {
        return res.render('addAdmin', { admin });
    } else {
        return res.redirect('/')
    }

}
module.exports.viewAdmin = async (req, res) => {

    try {
        let admin = req.cookies.admin;
        if (req.cookies.admin && req.cookies.admin._id) {
            var search = '';
            if (req.query.search) {
                search = req.query.search;
            }
            let AdminRecord = await Admin.find({
                $or: [
                    {
                        name: { $regex: search, $options: 'i' },
                        email: { $regex: search, $options: 'i' }
                    }
                ]
            });
            return res.render('viewAdmin', { AdminRecord, admin });
        }
        else {
            return res.redirect('/')
        }

    }
    catch (err) {
        console.log(err);
        return res.render('viewAdmin');
    }

}
module.exports.insertAdmin = async (req, res) => {
    try {

        req.body.name = req.body.fname + " " + req.body.lname;
        // set image
        if (req.file) {
            req.body.profile = Admin.adminImagePath + "/" + req.file.filename;
        }
        // end
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.created_date = moment().format('DD-MM-YYYY, h:mm:ss a');
        req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss a');

        // insert data in database
        let AdminRecord = await Admin.create(req.body);
        return res.redirect('/admin/addAdmin');
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/addAdmin');
    }
}


module.exports.deleteAdmin = async (req, res) => {
    try {
        let adminPos = req.params.AdminId;
        if (adminPos) {
            let adminData = await Admin.findById(adminPos);
            // delete Image
            if (adminData.profile) {
                let imagePath = path.join(__dirname, '..', adminData.profile);
                await fs.unlinkSync(imagePath);
            }
            else {
                console.log('Image Not found');
            }
            // end
            // delete data from database
            await Admin.findByIdAndDelete(adminData);
            return res.redirect('/admin/viewAdmin');
        } else {
            console.log("No Record Found");
            return res.redirect('/admin/viewAdmin');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        let adminPos = req.params.AdminId;
        if (adminPos) {
            let adminData = await Admin.findById(adminPos);
            return res.render('editAdmin', { adminPos, adminData, admin });
        }
        else {
            console.log("No Record Found");
            return res.render('editAdmin');
        }

    } catch (err) {
        console.log(err);
        return res.render('editAdmin');
    }
}
module.exports.updateAdmin = async (req, res) => {
    try {
        let adminData = await Admin.findById(req.params.AdminId);
        if (req.file) {
            req.body.profile = Admin.adminImagePath + "/" + req.file.filename;

            if (adminData.profile) {
                let imagePath = path.join(__dirname, "..", adminData.profile);
                await fs.unlinkSync(imagePath);
            }
        }
        else {
            req.body.profile = adminData.profile;
        }
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss a');

        let updateData = await Admin.findByIdAndUpdate(req.params.AdminId, req.body);
        return res.redirect('/admin/viewAdmin');

    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }

}
module.exports.viewSingle = async (req, res) => {
    try {
        const single = await Admin.findById(req.params.AdminId);
        return res.status(200).json({
            status: "success",
            data: single
        })
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}

module.exports.changePasswordPage = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        return res.render('auth/changePassword', { admin })
    } catch (err) {
        console.log(err)
        return res.redirect("/")
    }
}
module.exports.changePassword = async (req, res) => {
    try {
        console.log(req.body);
        let admin = req.cookies.admin;
        console.log(admin)
        let matchOldpass = await bcrypt.compare(req.body.oldpassword, admin.password);

        if (matchOldpass) {
            if (req.body.newpassword == req.body.cpassword) {
                if (req.body.newpassword == req.body.cpassword) {
                    let updatedPassword = await bcrypt.hash(req.body.newpassword, 10)
                    console.log(updatedPassword);

                    let changepass = await Admin.findByIdAndUpdate(admin._id, {password: updatedPassword})
                    console.log("Password changed successfully");
                    return res.redirect("/")
                }
                else {
                    console.log("New passwprd & confirm password mismatch");
                    return res.redirect("/")
                }
            }
        }
    } catch (err) {
        console.log(err)
        return res.redirect("/")
    }
}

module.exports.viewProfile=async(req,res)=>{
    try{
        let admin = req.cookies.admin;
        return res.render('auth/ViewProfile' ,{admin})
    }catch(err){
        console.log(err)
        return res.redirect("/admin")
    }
}


