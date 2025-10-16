
const categoryModel = require('../model/categoryModel')

const SubCategoryModel = require('../model/subCategoryModel')

const ExtraSubCategoryModel=require('../model/extraSubCategoryModel')

module.exports.AddSubcategoryPage = async (req, res) => {
    try {
        let categoryData = await categoryModel.find();
        return res.render('SubCategory/AddSubCategory', { categoryData })

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.insertSubCategory = async (req, res) => {
    try {
        let Subcategories = await SubCategoryModel.create(req.body);
        return res.redirect('/admin/sub-category/addSubCategory')
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.viewSubCategory = async (req, res) => {
    try {
        let subCategoryData = await SubCategoryModel.find().populate('category');
        // console.log(subCategoryData);
        return res.render('SubCategory/viewSubCategory', { subCategoryData })

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}
module.exports.deleteSubCategory = async (req, res) => {
    try {
        let subcategoryID = req.params.SubCategory_ID;
        await SubCategoryModel.findByIdAndDelete(subcategoryID);
        await ExtraSubCategoryModel.deleteMany({subCategory:subcategoryID})
        return res.redirect('/admin/sub-category/viewSubCategory')

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.editSubCategoryPage = async (req, res) => {
    try {
        let subcategoryID = req.params.SubCategory_ID;
        let subCategoryData = await SubCategoryModel.findById(subcategoryID).populate('category');
        return res.render('SubCategory/EditSubCategory', { subCategoryData });
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.editSubCategory = async (req, res) => {
    try {

        let subcategoryID = req.params.SubCategory_ID;
        let subCategoryData = await SubCategoryModel.findByIdAndUpdate(subcategoryID,req.body);
        return res.redirect('/admin/sub-category/viewSubCategory')
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}