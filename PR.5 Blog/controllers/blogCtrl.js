
const blog = require('../model/blogModel');

module.exports.blogHome = async (req, res) => {
    let blogData = await blog.find()
    return res.render('blogHome', { blogData });
}

module.exports.addBlog = async (req, res) => {
    return res.render('addBlog');
}

module.exports.insertBlog = async (req, res) => {
    if (req.file) {
        req.body.image = blog.imagePath + "/" + req.file.filename;
    }
    await blog.create(req.body)
    return res.redirect("/");
}

module.exports.viewBlog = async (req, res) => {
    let blogid = req.query.blogId;

    let singleBlog = await blog.findById(blogid);

    return res.render("view_blog", { blog: singleBlog });
}