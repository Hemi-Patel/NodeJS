const express = require('express');
const port = 8001;
const app =express();
const path=require('path')
const dbConnect =require('./config/dbConnect')

app.use(express.urlencoded())
app.use(express.json());
app.use('/Uploads',express.static(path.join(__dirname,'/Uploads')))


app.use('/api',require('./Routes/index.routes'))
app.listen(port,(err)=>{
    (err)?console.log(err):console.log(`server is running at http://localhost:${port}`);
})
