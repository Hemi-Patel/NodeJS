const categoryModel = require('../model/categoryModel');
const subCategoryModel = require('../model/subCategoryModel');
const extraSubcategoryModel = require('../model/extraSubCategoryModel');
const productModel = require('../model/productModel');
const path = require('path');
const fs = require('fs')


module.exports.AddProductPage = async (req, res) => {
    try {
        let categories = await categoryModel.find();
        let subcategories = await subCategoryModel.find();
        let ExtraSubCategories = await extraSubcategoryModel.find();

        return res.render('Product/addProduct', { categories, subcategories, ExtraSubCategories })
    } catch (error) {
        console.log(error);
        return res.redirect('/admin')

    }
}
module.exports.AddProduct = async (req, res) => {
    try {
        if (req.file) {
            req.body.p_image = productModel.ProductimagePath + '/' + req.file.filename;
        }
        let products = await productModel.create(req.body);
        console.log(products);

        return res.redirect('/admin/product/AddProduct')
    } catch (error) {
        console.log(error);
        return res.redirect('/admin')
    }
}

module.exports.FindProducts = async (req, res) => {
    try {
        let subCategoryId = req.query.SubcategoryID;
        // console.log(subCategoryId);
        let ExtraSubCategory = await extraSubcategoryModel.find({ subCategory: subCategoryId })
        // console.log(ExtraSubCategory);
        res.json({ ExtraSubCategory, message: "extra Sub Category fetched Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
        return res.redirect('/admin')
    }
}

module.exports.ViewProduct = async (req, res) => {
    try {
        let products = await productModel.find().populate('category').populate('subCategory').populate('extraSubcategory');
        // console.log(products);
        return res.render('Product/ViewProducts', { products })
    } catch (error) {
        console.log(error);
        return res.redirect('/admin')
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        let productID = req.params.id;
        // console.log(productID);
        let productData = await productModel.findById(productID);
        // console.log(productData);
        if (productData) {
            let ImagePath = path.join(__dirname, '..', productData.p_image);
            // console.log(ImagePath);
            await fs.unlinkSync(ImagePath);
        }
        await productModel.findByIdAndDelete(productID);
        return res.redirect('/admin/product/ViewProduct')
    } catch (error) {
        console.log(error);
        return res.redirect('/admin')
    }
}

module.exports.editProductPage = async (req, res) => {
    try {
        let productData = await productModel.findById(req.params.id).populate('category').populate('subCategory').populate('extraSubcategory');
        return res.render('Product/EditProducts', { productData })
    } catch (error) {
        console.log(error);
        return res.redirect('/admin')
    }
}
module.exports.EditProduct = async (req, res) => {
    try {
        let productData = await productModel.findById(req.params.id).populate('category').populate('subCategory').populate('extraSubcategory');
        if (req.file) {
            req.body.p_image = productModel.ProductimagePath + "/" + req.file.filename;

            if (productData.p_image) {
                let imagePath = path.join(__dirname, "..", productData.p_image);
                await fs.unlinkSync(imagePath);
            }
        }
        else {
            req.body.p_image = productData.p_image;
        }
        let updateProducts = await productModel.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('/admin/product/ViewProduct');

    } catch (error) {
        console.log(error);
        return res.redirect('/admin')
    }
}

module.exports.ViewSingleProduct=async(req,res)=>{

    try {
        let product=await productModel.findById(req.params.id);
        // console.log(product);
        
        return res.render('Product/ViewSingleProduct',{product})
    } catch (error) {
        console.log(error);
        return res.redirect('/admin')
    }
}