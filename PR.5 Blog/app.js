const express = require('express');
const port = 8005;
const app = express();
const path = require('path');

const db = require('./config/db');
const blog = require('./model/blogModel');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





app.use('/', require('./routes'));

app.listen(port, (err) => {
    (err) ? console.log(err) : console.log(`server Running on http://localhost:${port}/`);
})