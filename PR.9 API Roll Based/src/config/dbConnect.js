const mongoose=require('mongoose');
const dbConnect=async () => {
        await mongoose.connect('mongodb+srv://Hemi:hemi1234@cluster0.9ejjpfm.mongodb.net/APIRollBased');
        console.log('DB is Connected');       
}
module.exports=dbConnect();