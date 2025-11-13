const EmployeeModel = require('../Model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../Middleware/sendMail')

module.exports.LoginEmployee = async (req, res) => {
    try {
        let Employee = await EmployeeModel.findOne({ email: req.body.email })
        if (Employee) {
            let matchPass = await bcrypt.compare(req.body.password, Employee.password)
            if (matchPass) {
                let token = jwt.sign({ UserID: Employee._id }, "testing");
                console.log(token);

                return res.json({ message: "Login Success...", data: token });
            } else {
                return res.json({ message: "Password Not Match..." });
            }
        } else {
            return res.json({ message: "Employee Not Exist Please Register..." });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.ViewProfileEmployee = async (req, res) => {
    try {
        // console.log(req.user);        
        return res.json({ message: "Employee Profile", data: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });

    }

}

module.exports.EditProfile = async (req, res) => {
    try {
        let Employee = req.user;
        // console.log(Employee);
        if (req.file) {
            if (Employee.profile) {
                const imagePath = path.join(__dirname, '..', Employee.profile)
                //    console.log(imagePath);
                fs.unlinkSync(imagePath);
            }
            Employee.profile = `/Uploads/${req.file.filename}`
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        await EmployeeModel.findByIdAndUpdate(req.user._id, req.body);
        return res.json({ message: "Profile Updated Success..." })

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}