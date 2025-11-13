const userModel = require('../Model/userModel');
const managerModel = require('../Model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../Middleware/sendMail')

module.exports.RegisterUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            return res.json({ message: "User Already Exist..." });
        }
        else {
            if (req.file) {
                req.body.profile = `/Uploads/${req.file.filename}`
            }
            else {
                req.body.profile = " "
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await userModel.create(req.body)
            return res.json({ message: "Register Success..." });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.LoginUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        // console.log(user);
        if (user) {
            let matchPass = await bcrypt.compare(req.body.password, user.password)
            if (matchPass) {
                let token = jwt.sign({ UserID: user._id }, "testing");
                // console.log(token);

                return res.json({ message: "Login Success...", data: token });
            } else {
                return res.json({ message: "Password Not Match..." });
            }
        } else {
            return res.json({ message: "User Not Exist Please Register..." });
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.ViewProfile = async (req, res) => {
    try {
        return res.json({ message: "Admin Profile", data: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });

    }
}
module.exports.DeleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await userModel.findById(id)
        // console.log(id);
        const user = req.user;
        // console.log(user);
        if (admin) {
            if (user.id === admin.id) {
                return res.json({ message: "Admin Can not be delete his own Account..." })
            } else {
                if (admin.profile) {
                    const imagePath = path.join(__dirname, "..", admin.profile)
                    // console.log(imagePath);
                    fs.unlinkSync(imagePath)
                }
                await userModel.findByIdAndDelete(id);
                return res.json({ message: "Admin Deleted Success..." });
            }
        } else {
            return res.json({ message: "Admin Not found..." })
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.EditAdmin = async (req, res) => {
    try {

        const id = req.params.id;
        // console.log(id);
        const user = req.user;
        const admin = await userModel.findById(id);

        if (admin) {
            if (user.id == admin.id) {
                if (req.file) {
                    if (admin.profile) {
                        const imagePath = path.join(__dirname, "..", admin.profile)
                        // console.log(imagePath);
                        fs.unlinkSync(imagePath)
                    }
                    req.body.profile = `/Uploads/${req.file.filename}`
                }
                await userModel.findByIdAndUpdate(id, req.body);
                return res.json({ message: "Profile Updated Success..." })
            }
            else {
                return res.json({ message: "Admin can't change other Admin Profile..." })
            }
        } else {
            return res.json({ message: "Admin Not Found..." })
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.ViewAllUser = async (req, res) => {
    try {

        const AllUser = await userModel.find();
        return res.json({ message: "All user", data: AllUser })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}

// Manager 
module.exports.AddManager = async (req, res) => {
    try {
        const existManager = await managerModel.findOne({ email: req.body.email });
        if (existManager) {
            return res.json({ message: "Manager Already Exist..." })
        }
        else {
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
            await managerModel.create(req.body);
            await sendEmail(mailMessage);
            return res.json({ message: "Manager Added Successfully..." })
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.DeleteManager = async (req, res) => {
    try {
        let Manager = await managerModel.findById(req.params.id);
        // console.log(Manager);
        if (Manager) {
            if (Manager.profile) {
                const imagePath = path.join(__dirname, "..", Manager.profile);
                // console.log(imagePath);
                fs.unlinkSync(imagePath)
            }
            await managerModel.findByIdAndDelete(req.params.id);
            return res.json({ message: "Manager deleted success..." })
        } else {
            return res.json({ message: "Manager Not found..." })
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.EditManager = async (req, res) => {
    try {
        let Manager = await managerModel.findById(req.params.id);
        // console.log(Manager);
        if (Manager) {
            if (req.file) {
                const imagePath = path.join(__dirname, "..", Manager.profile);
                // console.log(imagePath);
                fs.unlinkSync(imagePath);
                req.body.profile=`/Uploads/${req.file.filename}`;
            }
            if(req.body.password){
                req.body.password=await bcrypt.hash(req.body.password,10);
            }
            await managerModel.findByIdAndUpdate(req.params.id,req.body);
            return res.json({message:"Manager Updated success..."});
        } else {
            return res.json({message:"Manager Not found"});
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}
module.exports.ViewAllManager=async (req,res) => {
    try {
        const AllManger=await managerModel.find({role:"Manager"});
        return res.json({message:"All Manger List",data:AllManger})
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }    
}

module.exports.ViewSingleManger =async (req,res) => {
    try {
        const Manager=await managerModel.findById(req.params.id);
        return res.json({message:"Manager",data:Manager})
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server Error...", status: "500" });
    }
}