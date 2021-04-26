var Categories = require("../models/Category");
var Product = require("../models/Product");
var { multipleToObject, toObject } = require("../../util/toObj");

/// schema validate
const joiSchemaProduct = require("../../util/joi-validate/validateProduct");
const Joi = require("joi");

/// upload file
const cloudinary = require("../../util/cloudinary");
const upload = require("../../util/multer");
const { renderSync } = require("node-sass");
class AdminController {
    /// Get -> /admin/
    home(req, res, next) {
        res.render("admin-body/admin-home", { layout: "admin" });
    }

    /// Get -> /admin/category
    category(req, res, next) {
        Categories.find({}).then((categories) => {
            res.render("admin-body/admin-category", {
                layout: "admin",
                categories: multipleToObject(categories),
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
        newCategory
            .save()
            .then(() => {
                res.status(201).redirect("/admin/category");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // GET -> /admin/category/bin
    categoryBin(req, res, next) {
        Categories.findDeleted({}).then((categoryDeleted) => {
            res.render("admin-body/admin-categoryBin", {
                layout: "admin",
                categoryDeleted: multipleToObject(categoryDeleted),
            });
        });
    }

    // PATCH -> /admin/category/:id
    categoryBinRestore(req, res, next) {
        var newArr = req.params.id.split(",");
        Categories.restore({
            _id: { $in: newArr },
        }).then(() => {
            res.redirect("back");
        });
    }

    // DELETE -> /admin/category/:id
    categoryDelete(req, res, next) {
        var newArr = req.params.id.split(",");
        Categories.delete({
            _id: { $in: newArr },
        }).then(() => {
            res.redirect("back");
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

    // Get -> /admin/product/update?id=
    async productUpdateView(req, res, next) {
        var idProduct = req.query.id;

        Promise.all([Product.find({ _id: idProduct }), Categories.find({})]).then(([product, categories]) => {
            res.render("admin-body/admin-productUpdate", {
                layout: "admin",
                product: multipleToObject(product),
                categories: multipleToObject(categories),
            });
        });
    }

    // PUT -> /admin/product/update?id=
    async productUpdate(req, res, next) {
        var oldProduct = await Product.find({ _id: req.params.id });
        var isImageExist = req.file?.path;

        await Categories.findOneAndUpdate(
            { slug: oldProduct[0].nameCategory },
            { $pull: { productchid: { _id: oldProduct[0]._id } } },
            { multi: true }
        );

        ////// If image has changed //////
        if (isImageExist) {
            /// delete old image and uppload a new image
            try {
                await cloudinary.uploader.destroy(oldProduct[0].cloudinaryId_imageProduct);
                var result_uploadImage = await cloudinary.uploader.upload(req.file.path);
            } catch (error) {
                console.log(error);
            }

            /// check if nameCategory has changed
            if (!(oldProduct[0].nameCategory === req.body.nameCategory)) {
                var productChild = await Product.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                        nameCategory: req.body.nameCategory,
                        priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                        statusProduct: req.body.statusProduct,
                        inventoryProduct: req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                        descriptionProduct: req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                        imageProduct: result_uploadImage.url,
                        cloudinaryId_imageProduct: result_uploadImage.public_id,
                    },
                    { new: true }
                );

                Categories.findOneAndUpdate(
                    { slug: productChild.nameCategory },
                    { $push: { productchid: productChild } }
                ).then(() => {
                    res.redirect("/admin/product");
                });
                return;
            }
            // if nameCategory have not changed
            Product.findOneAndUpdate(
                { _id: req.params.id },
                {
                    nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                    nameCategory: req.body.nameCategory,
                    priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                    statusProduct: req.body.statusProduct,
                    inventoryProduct: req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                    descriptionProduct: req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                    imageProduct: result_uploadImage.url,
                    cloudinaryId_imageProduct: result_uploadImage.public_id,
                },
                { new: true }
            )
                .then((productChild) => {
                    return Categories.findOneAndUpdate(
                        { slug: productChild.nameCategory },
                        { $push: { productchid: productChild } }
                    );
                })
                .then(() => {
                    res.redirect("/admin/product");
                });
            return;
        }

        ////// if image have not change //////
        // check if nameCategory has changed
        if (!(oldProduct[0].nameCategory === req.body.nameCategory)) {
            await Categories.findOneAndUpdate(
                {},
                { $pull: { productchid: { _id: oldProduct[0]._id } } },
                { multi: true }
            );

            var productChild = await Product.findOneAndUpdate(
                { _id: req.params.id },
                {
                    nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                    nameCategory: req.body.nameCategory,
                    priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                    statusProduct: req.body.statusProduct,
                    inventoryProduct: req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                    descriptionProduct: req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                    imageProduct: oldProduct[0].imageProduct,
                    cloudinaryId_imageProduct: oldProduct[0].cloudinaryId_imageProduct,
                },
                { new: true }
            );

            Categories.findOneAndUpdate(
                { slug: productChild.nameCategory },
                { $push: { productchid: productChild } }
            ).then(() => {
                res.redirect("/admin/product");
            });
            return;
        }

        // if nameCategory have not changed
        Product.findOneAndUpdate(
            { _id: req.params.id },
            {
                nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                nameCategory: req.body.nameCategory,
                priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                statusProduct: req.body.statusProduct,
                inventoryProduct: req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                descriptionProduct: req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                imageProduct: oldProduct[0].imageProduct,
                cloudinaryId_imageProduct: oldProduct[0].cloudinaryId_imageProduct,
            },
            { new: true }
        )
            .then((productChild) => {
                return Categories.findOneAndUpdate(
                    { slug: productChild.nameCategory },
                    { $push: { productchid: productChild } }
                );
            })
            .then(() => {
                res.redirect("/admin/product");
            });
    }

    // GET -> /admin/product/bin
    productBin(req, res, next) {
        Product.findDeleted({}).then((productDeleted) => {
            res.render("admin-body/admin-productBin", {
                layout: "admin",
                productDeleted: multipleToObject(productDeleted),
            });
        });
    }

    // PATCH -> /admin/product/:id
    productBinRestore(req, res, next) {
        var newArr = req.params.id.split(",");
        Product.restore({
            _id: { $in: newArr },
        }).then(() => {
            res.redirect("back");
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

        /// check if user dont have any category
        if (!req.body.nameCategory) {
            res.status(400).json({
                message: "You don't have any category, please insert your category first",
            });
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
            var newProductChild = await newProduct.save();

            Categories.findOneAndUpdate(
                { slug: newProduct.nameCategory },
                { $push: { productchid: newProductChild } }
            ).then((x) => {
                res.status(201).json(x);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AdminController();
