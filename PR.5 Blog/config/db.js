
const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/blog');
mongoose.connect('mongodb+srv://Hemi:hemi1234@cluster0.9ejjpfm.mongodb.net/blog');


const db=mongoose.connection;

db.once("open",(err)=>{

        if(err){
            console.log(err);
        }
        console.log('db is connected');
})

module.exports=db;