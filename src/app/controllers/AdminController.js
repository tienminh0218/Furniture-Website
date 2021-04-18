var Categories = require("../models/Category");
var Product = require("../models/Product");
const Joi = require("joi");
var { multipalToObject } = require("../../util/toObj");
const cloudinary = require("../../util/cloudinary");
const upload = require("../../util/multer");
class AdminController {
    /// Get -> /admin/
    home(req, res, next) {
        res.render("admin-body/admin-home", { layout: "admin" });
    }

    /// Get -> /admin/category
    category(req, res, next) {
        Categories.find({}).then((categorys) => {
            res.render("admin-body/admin-category", {
                layout: "admin",
                categorys: multipalToObject(categorys),
            });
        });
    }

    /// Get -> /admin/category/insert
    categoryAdd(req, res, next) {
        res.render("admin-body/admin-categoryInsert", { layout: "admin" });
    }

    /// Post -> /admin/category/insert
    categoryInsert(req, res, next) {
        var newCategory = new Categories(req.body);
        console.log(newCategory);
        return;
        newCategory
            .save()
            .then(() => {
                res.status(201).redirect("/admin/category");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Get -> /admin/product
    product(req, res, next) {
        res.render("admin-body/admin-product", { layout: "admin" });
    }

    // Get -> /admin/product/insert
    productAdd(req, res, next) {
        Categories.find({}).then((categories) => {
            res.render("admin-body/admin-productInsert", {
                layout: "admin",
                categories: multipalToObject(categories),
            });
        });
    }

    // POST -> /admin/product/insert
    async productInsert(req, res, next) {
        /// Check product isExist
        var isExistProduct = await Product.findOne({
            nameProduct: req.body.nameProduct,
        });
        if (isExistProduct) {
            res.status(409).json({
                message: "Product already exist",
            });
            return;
        }

        /// Schema Product
        var schema = Joi.object({
            nameProduct: Joi.string().min(6).max(100).required(),
            nameCategory: Joi.string().min(6).max(100).required(),
            priceProduct: Joi.number().required(),
            descriptionProduct: Joi.string().required(),
            imageProduct: Joi.string(),
            statusProduct: Joi.string().min(6).max(100).required(),
            inventoryProduct: Joi.number().required(),
        });

        /// Validate form product
        // const checked = await schema.validate({
        //     nameProduct: req.body.nameProduct,
        //     nameCategory: req.body.nameCategory,
        //     priceProduct: req.body.priceProduct,
        //     descriptionProduct: req.body.descriptionProduct,
        //     imageProduct: req.body.imageProduct,
        //     statusProduct: req.body.statusProduct,
        //     inventoryProduct: req.body.inventoryProduct,
        // });
        // var { error } = checked;
        //// sai cmnr ma chua sua
        // if (error) {
        //     Categories.find({}).then((categories) => {
        //         res.render("admin-body/admin-productInsert", {
        //             layout: "admin",
        //             errorMessageServer: error.details[0].message,
        //             categories: multipalToObject(categories),
        //         });
        //     });
        //     return;
        // }

        try {
            /// Upload image to cloudinary
            const result_uploadImage = await cloudinary.uploader.upload(
                req.file.path
            );

            /// Create a new product
            var newProduct = new Product({
                nameProduct: req.body.nameProduct,
                nameCategory: req.body.nameCategory,
                priceProduct: req.body.priceProduct,
                descriptionProduct: req.body.descriptionProduct,
                statusProduct: req.body.statusProduct,
                inventoryProduct: req.body.inventoryProduct,
                imageProduct: result_uploadImage.url,
                cloudinaryId_imageProduct: result_uploadImage.public_id,
            });

            /// save new product to database
            newProduct.save().then(() => {
                res.redirect("/admin/product");
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AdminController();
