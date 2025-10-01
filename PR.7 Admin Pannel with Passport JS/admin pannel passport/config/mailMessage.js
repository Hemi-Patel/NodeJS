const nodemailer = require('nodemailer');

module.exports.sendMail = async (msg) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for 465, false for 587
            auth: {
                user: "hemipatel301@gmail.com",
                pass: "kteuhtxrghdzndks", // your Gmail App Password
            },
        });

        let info = await transporter.sendMail(msg);
        return info;
    } catch (err) {
        console.error("Email send error:", err);
        throw err;
    }
};

