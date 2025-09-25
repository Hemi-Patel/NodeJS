const BlogModel = require('../model/blogModel');
const fs = require('fs');
const path = require('path');
const Blog = require('../model/blogModel');


module.exports.AddBlog = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        if (admin) {
            return res.render("Blog/AddBlog", { admin });
        } else {
            return res.redirect('/admin');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}
module.exports.insertBlog = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = Blog.blogImagePath + "/" + req.file.filename;
        }
        let BlogRecord = await BlogModel.create(req.body);
        return res.redirect('/admin/blog/addBlog');
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/blog/addBlog');
    }
}
module.exports.ViewBlog = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        if (admin) {

            var search = '';
            var categories = ['Fashion', 'Business', 'Technology', 'Web Design', 'Lifestyle']
            if (req.query.search) {
                search = req.query.search;
                console.log(search);

            }

            var filterByCategory = req.query.filterByCategory || '';

            let query = {};

            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ];
            }

            if (filterByCategory) {
                query.category = { $regex: filterByCategory, $options: 'i' };
            }
            let BlogRecord = await BlogModel.find(query)
            // $or: [
            //     {
            //         title: { $regex: search, $options: 'i' },
            //         category: { $regex: filterByCategory, $options: "i" },
            //     }
            // ]
            // });
            console.log(BlogRecord);

            return res.render('Blog/ViewBlog', { admin, BlogRecord, categories, filterByCategory });
        } else {
            return res.redirect('/admin');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}

module.exports.DeleteBlog = async (req, res) => {
    try {
        let blogId = req.params.BlogID;
        if (blogId) {
            let BlogData = await BlogModel.findById(blogId)
            if (BlogData) {
                let imagePath = path.join(__dirname, '..', BlogData.image);
                await fs.unlinkSync(imagePath);
            } else {
                console.log("Image not found");
                return res.redirect("/admin/blog/viewBlog");
            }
            await BlogModel.findByIdAndDelete(BlogData);
            return res.redirect("/admin/blog/viewBlog");
        } else {
            return res.redirect("/admin/blog/viewBlog");
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}

module.exports.EditBlog = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        let blogId = req.params.BlogID;
        if (blogId) {
            let BlogData = await BlogModel.findById(blogId);
            return res.render('Blog/EditBlog', { blogId, BlogData, admin });
        }
        else {
            console.log("No Record Found");
            return res.render('/admin/blog/viewBlog');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}

module.exports.UpdateBlog = async (req, res) => {
    try {

        let BlogData = await BlogModel.findById(req.params.BlogID);

        if (req.file) {

            req.body.image = BlogModel.blogImagePath + "/" + req.file.filename;

            if (BlogData.image) {
                let imagePath = path.join(__dirname, "..", BlogData.image);
                console.log(imagePath);
                await fs.unlinkSync(imagePath);
            }
        }
        else {
            req.body.image = BlogData.image;
        }
        let updateData = await BlogModel.findByIdAndUpdate(req.params.BlogID, req.body);
        return res.redirect('/admin/blog/viewBlog');

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/blog/viewBlog');
    }
}

module.exports.ReadBlog = async (req, res) => {

    try {
        let admin = req.cookies.admin;
        if (admin) {
            let BlogRecord = await BlogModel.findById(req.params.BlogID);
            console.log(BlogRecord);

            if (BlogRecord) {
                return res.render("Blog/SingleBlog", { admin, BlogRecord });
            } else {
                return res.redirect('/admin');
            }
        } else {
            return res.redirect('/admin');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}
