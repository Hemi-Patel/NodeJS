const express = require('express');
const port = 8010;
const app = express();
const path = require('path');
const db = require('./config/db');
const Admin = require('./model/adminModel');

app.use(express.urlencoded());
const cookieParser = require('cookie-parser');

const flash=require('connect-flash')
app.use(flash());
const FlashMSG=require('./config/FlashMsg')

const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('./config/localStrategy');


app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressSession({
    name: 'testing',
    secret: 'admin panel',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser)
app.use(FlashMSG.FlashMSG)

app.use('/', require('./routes'));
app.listen(port, (err) => {
    err ? console.log(err) : console.log("server is running on port http://localhost:8010");
})