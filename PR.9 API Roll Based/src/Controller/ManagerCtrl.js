const managerModel = require('../Model/userModel');
const EmployeeModel = require('../Model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../Middleware/sendMail')


module.exports.LoginManger = async (req, res) => {
    try {
        let manager = await managerModel.findOne({ email: req.body.email })
        // console.log(user);
        if (manager) {
            let matchPass = await bcrypt.compare(req.body.password, manager.password)
            if (matchPass) {
                let token = jwt.sign({ UserID: manager._id }, "testing");
                console.log(token);

                return res.json({ message: "Login Success...", data: token });
            } else {
                return res.json({ message: "Password Not Match..." });
            }
        } else {
            return res.json({ message: "Manager Not Exist Please Register..." });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.ViewProfileManger = async (req, res) => {
    try {
        // console.log(req.user);        
        return res.json({ message: "Manger Profile", data: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });

    }

}

module.exports.EditProfile = async (req, res) => {
    try {
        let Manager = req.user;
        // console.log(Manager);
        if (req.file) {
            if (req.user.profile) {
                const imagePath = path.join(__dirname, '..', req.user.profile)
                //    console.log(imagePath);
                fs.unlinkSync(imagePath);
            }
            req.user.profile = `/Uploads/${req.file.filename}`
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        await managerModel.findByIdAndUpdate(req.user._id, req.body);
        return res.json({ message: "Profile Updated Success..." })

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}

// Employees 

module.exports.AddEmployee = async (req, res) => {
    try {
        const existEmployee = await EmployeeModel.findOne({ email: req.body.email });
        if (existEmployee) {
            return res.json({ message: "Employee Already Exist..." })
        } else {
            if (req.file) {
                req.body.profile = `/Uploads/${req.file.filename}`
            }
            const mailMessage = {
                from: 'hemipatel301@gmail.com',
                to: "hemipatel6498@gmail.com",
                subject: "Register Profile",
                html: `<p>Hello...${req.body.name}</p>
                            <p>Your Email is ${req.body.email} and Password is ${req.body.password} to Login...`
            }

            req.body.password = await bcrypt.hash(req.body.password, 10)
            await EmployeeModel.create(req.body);
            await sendEmail(mailMessage);
            return res.json({ message: "Employee Added Successfully..." })
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }

}

module.exports.DeleteEmployee = async (req, res) => {
    try {
        let Employee = await EmployeeModel.findById(req.params.id);
        // console.log(Employee);
        if (Employee) {
            if (Employee.profile) {
                const imagePath = path.join(__dirname, "..", Employee.profile);
                // console.log(imagePath);
                fs.unlinkSync(imagePath)
            }
            await EmployeeModel.findByIdAndDelete(req.params.id);
            return res.json({ message: "Employee deleted success..." })
        } else {
            return res.json({ message: "Employee Not found..." })
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}

module.exports.EditEmployee = async (req, res) => {
    try {
        let Employee = await EmployeeModel.findById(req.params.id);
        // console.log(Employee);
        if (Employee) {
            if (req.file) {
                const imagePath = path.join(__dirname, "..", Employee.profile);
                // console.log(imagePath);
                fs.unlinkSync(imagePath);
                req.body.profile=`/Uploads/${req.file.filename}`;
            }
            if(req.body.password){
                req.body.password=await bcrypt.hash(req.body.password,10);
            }
            await EmployeeModel.findByIdAndUpdate(req.params.id,req.body);
            return res.json({message:"Employee Updated success..."});
        } else {
            return res.json({message:"Employee Not found"});
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.ViewAllEmployee=async (req,res) => {
    try {
        const AllEmployee=await managerModel.find({role:"Employee"});
        return res.json({message:"All Employee List",data : AllEmployee})
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }    
}
module.exports.ViewSingleEmployee =async (req,res) => {
    try {
        const Employee=await EmployeeModel.findById(req.params.id);
        return res.json({message:"Employee",data:Employee})
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}