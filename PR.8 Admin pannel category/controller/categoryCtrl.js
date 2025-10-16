const categoryModel = require('../model/categoryModel')

const SubCategoryModel=require('../model/subCategoryModel')

const ExtraSubCategoryModel=require('../model/extraSubCategoryModel')


const path = require('path');
const fs = require('fs');
const category = require('../model/categoryModel');

module.exports.AddCategoryPage = async (req, res) => {
    try {
        return res.render("Category/addCategories");

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.insertCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = categoryModel.CategoryImagePath + '/' + req.file.filename;
        }
        let categories = await categoryModel.create(req.body);
        return res.redirect('/admin/category/addCategory')

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.ViewCategories = async (req, res) => {
    try {

        let categories = await categoryModel.find();
        // console.log(categories)
        return res.render('Category/viewCategories', { categories })
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}
module.exports.DeleteCategories = async (req, res) => {
    try {
        let categoryID = req.params.C_ID;
        let categoryData = await categoryModel.findById(categoryID);
        if (categoryData) {
            let imagepath = path.join(__dirname, '..', categoryData.image);
            await fs.unlinkSync(imagepath);
        }
        await categoryModel.findByIdAndDelete(categoryID);
        await SubCategoryModel.deleteMany({category:categoryID})
        await ExtraSubCategoryModel.deleteMany({category:categoryID})
        
        return res.redirect("/admin/category/viewCategory")

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.EditCategoryPage = async (req, res) => {
    try {
        let categoryID = req.params.C_ID;
        let categoryData = await categoryModel.findById(categoryID);
        if (categoryData) {
            return res.render('Category/EditCategory', { categoryData })
        }

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        let categoryData = await categoryModel.findById(req.params.C_ID);

        if (req.file) {

            req.body.image = categoryModel.CategoryImagePath + "/" + req.file.filename;

            if (categoryData.image) {
                let imagePath = path.join(__dirname, "..", categoryData.image);
                await fs.unlinkSync(imagePath);
            }
        }
        else {
            req.body.image = categoryData.image;
        }
        let updateData = await categoryModel.findByIdAndUpdate(req.params.C_ID, req.body);
        return res.redirect('/admin/category/viewCategory');

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}