const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/AdminData');
mongoose.connect('mongodb+srv://Hemi:hemi1234@cluster0.9ejjpfm.mongodb.net/AdminDataCategory');

const db=mongoose.connection;

db.once("open",(err)=>{
    if(err){
        console.log(err)
        return false;
    }
    console.log('db is connected')
})
module.exports=db;