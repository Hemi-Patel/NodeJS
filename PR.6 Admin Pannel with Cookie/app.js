const express = require('express');
const port = 8001;
const app = express();
const path = require('path');
const db = require('./config/db');
const Admin = require('./model/adminModel');

app.use(express.urlencoded());
const cookies = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes'));
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server is running on port http://localhost:${port}`);
})