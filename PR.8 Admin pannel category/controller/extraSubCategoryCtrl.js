
const categoryModel = require('../model/categoryModel')

const SubCategoryModel = require('../model/subCategoryModel')

const ExtraSubCategoryModel = require('../model/extraSubCategoryModel')

module.exports.addExtraSubCategory = async (req, res) => {
    try {
        let categoryData = await categoryModel.find();
        let subcategoryData = await SubCategoryModel.find();
        return res.render('ExtraSubCategory/addExtraSubcategory', { categoryData, subcategoryData })

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.insertExtraSubCategory = async (req, res) => {
    try {
        let ExtraSubcategories = await ExtraSubCategoryModel.create(req.body);
        return res.redirect('/admin/extra-sub-category/addExtraSubCategory')
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.viewExtraSubCategory = async (req, res) => {
    try {

        let ExtraSubcategories = await ExtraSubCategoryModel.find().populate('category').populate('subCategory');
        return res.render('ExtraSubCategory/viewExtraSubcategory', { ExtraSubcategories })

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.deleteExtraSubCategory = async (req, res) => {
    try {
        let ExtrasubcategoryID = req.params.id;
        let deleteSubCategory = await ExtraSubCategoryModel.findByIdAndDelete(ExtrasubcategoryID);
        return res.redirect('/admin/extra-sub-category/viewExtraSubCategory')

    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.editExtraSubCategoryPage = async (req, res) => {
    try {
        let ExtrasubcategoryID = req.params.id;
        let ExtraSubcategories = await ExtraSubCategoryModel.findById(ExtrasubcategoryID).populate('category').populate('subCategory');
        return res.render('ExtraSubCategory/EditEXtraSubCategory', { ExtraSubcategories });
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.editExtraSubCategory = async (req, res) => {
    try {

        let ExtrasubcategoryID = req.params.id;
        console.log(req.body);

        let ExtraSubcategories = await ExtraSubCategoryModel.findByIdAndUpdate(ExtrasubcategoryID, req.body);
        return res.redirect('/admin/extra-sub-category/viewExtraSubCategory')
    } catch (error) {
        console.log(error);
        return res.redirect("/admin")
    }
}

module.exports.FindSubCategories = async (req, res) => {
    try {
        let categoryID = req.query.categoryID;
        let subCategories = await SubCategoryModel.find({ category: categoryID })
        res.json({ subCategories, message: "SubCAtegories fetched Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
        return res.redirect("/admin")
    }

}