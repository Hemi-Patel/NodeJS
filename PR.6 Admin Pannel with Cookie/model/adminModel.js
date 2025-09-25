const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagePath = '/uploads/adminImages'


const AdminSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    qualification: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default:true,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    },

})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})
AdminSchema.statics.uploadAdminImage = multer({ storage }).single('profile');
AdminSchema.statics.adminImagePath = imagePath;

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin;