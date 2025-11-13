
const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');

const verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.json({ message: "Authorization missing..." })
    }
    let token = authorization.split(" ")[1];
    let { UserID } = jwt.verify(token, 'testing');
    const user = await userModel.findById(UserID);
    req.user = user;
    next();
}
module.exports = verifyToken;