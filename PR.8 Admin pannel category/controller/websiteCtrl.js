
const blogModel = require('../model/blogModel')

module.exports.ShowBlog = async (req, res) => {

    try {
        var search = '';
        var categories = ['Fashion', 'Business', 'Finance']
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
        let BlogRecord = await blogModel.find(query)

        return res.render('website/Website', { BlogRecord, categories, filterByCategory });       

    } catch (err) {
        console.log(err);
        return res.redirect("/")

    }
}

module.exports.ViewSingleBlog = async (req, res) => {

    try {
        let BlogRecord = await blogModel.findById(req.params.id);
        // console.log(BlogRecord);

        if (BlogRecord) {
            return res.render("website/SingleBlog", { BlogRecord });
        } else {
            return res.redirect('/admin');
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}