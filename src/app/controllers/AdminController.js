var Categories = require("../models/Category");
var Product = require("../models/Product");
var { multipleToObject } = require("../../util/toObj");

/// schema validate
const joiSchemaProduct = require("../../util/joi-validate/validateProduct");
const Joi = require("joi");

/// upload file
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
                categorys: multipleToObject(categorys),
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
        Product.find({}).then((products) => {
            res.render("admin-body/admin-product", {
                layout: "admin",
                products: multipleToObject(products),
            });
        });
    }

    // Get -> /admin/product/insert
    productAdd(req, res, next) {
        Categories.find({}).then((categories) => {
            res.render("admin-body/admin-productInsert", {
                layout: "admin",
                categories: multipleToObject(categories),
            });
        });
    }

    // DELETE -> /admin/product/:id
    productDelete(req, res, next) {
        var newArr = req.params.id.split(",");
        Product.delete({
            _id: { $in: newArr },
        }).then(() => {
            res.redirect("back");
        });
    }

    // POST -> /admin/product/insert
    async productInsert(req, res, next) {
        /// Check product isExist
        try {
            var isExistProduct = await Product.findOne({
                nameProduct: req.body.nameProduct,
            });
            if (isExistProduct) {
                res.status(409).json({
                    message: "Product already exist",
                });
                return;
            }
        } catch (error) {
            console.error(error);
        }

        /// Validate form product insert
        const checked = await joiSchemaProduct.schemaInsertProduct.validate(
            {
                nameProduct: req.body.nameProduct,
                priceProduct: req.body.priceProduct,
                descriptionProduct: req.body.descriptionProduct,
                inventoryProduct: req.body.inventoryProduct,
            },
            { abortEarly: false }
        );
        var { error } = checked;

        if (error) {
            res.status(409).json({ message: error.details });
            return;
        }

        try {
            /// Upload image to cloudinary
            const result_uploadImage = await cloudinary.uploader.upload(req.file.path);

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
                res.status(201).json();
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AdminController();
