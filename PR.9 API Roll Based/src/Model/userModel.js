const mongoose =require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email :{
        type:String
    },
    password:{
        type:String
    },
    role :{
        type:String,
        enum:["Admin","Manager","Employee"]
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    profile:{
        type:String
    },
    mobileNo:{
        type:Number
    }
},{
    timestamps:true,
    versionkey:false
})
module.exports=mongoose.model('user',userSchema)
