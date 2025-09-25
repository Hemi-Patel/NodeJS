const express =require ('express');
const port=8003;
const app=express();
const path=require('path');
const fs=require('fs');

const db=require('./config/db');
const book = require('./model/bookModel');

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',require('./routes'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server running on:",port);
})