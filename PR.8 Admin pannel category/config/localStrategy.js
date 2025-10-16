const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const Admin = require('../model/adminModel')
const bcrypt = require('bcrypt');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, cb) => {
    let adminRec = await Admin.findOne({ email: email });
    if (adminRec) {
        let matchPass = await bcrypt.compare(password, adminRec.password);
        if (matchPass) {
            cb(null, adminRec);
        } else {
            cb(null, false)
        }
    } else {
        cb(null, false)
    }
}))

passport.serializeUser((user, cb) => {
    cb(null, user.id);
})
passport.deserializeUser(async (id, cb) => {
    let adminRec = await Admin.findById(id);
    if (adminRec) {
        cb(null, adminRec);
    }
});

passport.checkAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.redirect("/")
    }
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.user) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;