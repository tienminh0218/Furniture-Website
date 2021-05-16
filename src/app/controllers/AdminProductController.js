var Categories = require("../models/Category");
var Product = require("../models/Product");
var { multipleToObject, toObject } = require("../../util/toObj");

/// schema validate
const joiSchemaProduct = require("../../util/joi-validate/validateProduct");
const Joi = require("joi");

/// upload file
const cloudinary = require("../../util/cloudinary");
const upload = require("../../util/multer");

class AdminProductController {
    // GET -> /admin/product
    product(req, res, next) {
        Product.find({}).then((products) => {
            res.render("admin-body/admin-product", {
                layout: "admin",
                products: multipleToObject(products),
            });
        });
    }

    // GET -> /admin/product/insert
    productAdd(req, res, next) {
        Categories.find({}).then((categories) => {
            res.render("admin-body/admin-productInsert", {
                layout: "admin",
                categories: multipleToObject(categories),
            });
        });
    }

    // GET -> /admin/product/update?id=
    async productUpdateView(req, res, next) {
        var idProduct = req.query.id;

        Promise.all([Product.find({ _id: idProduct }), Categories.find({})]).then(
            ([product, categories]) => {
                res.render("admin-body/admin-productUpdate", {
                    layout: "admin",
                    product: multipleToObject(product),
                    categories: multipleToObject(categories),
                });
            }
        );
    }

    // PUT -> /admin/product/update
    async productUpdate(req, res, next) {
        /// Validate form product update
        try {
            var checked = await joiSchemaProduct.schemaUpdateProduct.validate(
                {
                    nameProduct: req.body.nameProduct,
                    priceProduct: req.body.priceProduct,
                    inventoryProduct: req.body.inventoryProduct,
                },
                { abortEarly: false }
            );
        } catch (error) {
            console.log(error);
        }
        var { error } = checked;

        if (error) {
            res.status(409).json({ message: error.details });
            return;
        }

        // check name category is exists
        var [isExistProduct, oldProduct] = await Promise.all([
            Product.findOne({
                nameProduct: req.body.nameProduct,
            }),
            Product.find({ _id: req.body.id }),
        ]);
        if (isExistProduct && !(oldProduct[0].nameProduct === isExistProduct.nameProduct)) {
            return res.status(409).json({ message: "Name product had exists" });
        }

        var isImageExist = req.file?.path;

        await Categories.findOneAndUpdate(
            { slug: oldProduct[0].nameCategory },
            { $pull: { productChild: { _id: oldProduct[0]._id } } },
            { multi: true }
        );

        ////// If image has changed //////
        if (isImageExist) {
            /// delete old image and uppload a new image
            try {
                var [result_uploadImage] = await Promise.all([
                    cloudinary.uploader.upload(req.file.path),
                    cloudinary.uploader.destroy(oldProduct[0].cloudinaryId_imageProduct),
                ]);
            } catch (error) {
                console.log(error);
            }

            /// check if nameCategory has changed
            if (!(oldProduct[0].nameCategory === req.body.nameCategory)) {
                Product.findOneAndUpdate(
                    { _id: req.body.id },
                    {
                        nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                        nameCategory: req.body.nameCategory,
                        priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                        statusProduct: req.body.statusProduct,
                        inventoryProduct:
                            req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                        descriptionProduct:
                            req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                        imageProduct: result_uploadImage.url,
                        cloudinaryId_imageProduct: result_uploadImage.public_id,
                    },
                    { new: true }
                )
                    .then((productChild) => {
                        return Categories.findOneAndUpdate(
                            { slug: productChild.nameCategory },
                            { $push: { productChild: productChild } }
                        );
                    })
                    .then(() => {
                        res.status(200).json({ message: "Updated Successfully" });
                    })
                    .catch((err) => {
                        console.log(`${err} 1`);
                    });
                return;
            }
            // if nameCategory have not changed
            Product.findOneAndUpdate(
                { _id: req.body.id },
                {
                    nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                    nameCategory: req.body.nameCategory,
                    priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                    statusProduct: req.body.statusProduct,
                    inventoryProduct: req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                    descriptionProduct:
                        req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                    imageProduct: result_uploadImage.url,
                    cloudinaryId_imageProduct: result_uploadImage.public_id,
                },
                { new: true }
            )
                .then((productChild) => {
                    return Categories.findOneAndUpdate(
                        { slug: productChild.nameCategory },
                        { $push: { productChild: productChild } }
                    );
                })
                .then(() => {
                    res.status(200).json({ message: "Updated Successfully" });
                })
                .catch((err) => {
                    console.log(`${err} 2`);
                });
            return;
        }

        ////// if image have not change //////
        // check if nameCategory has changed
        if (!(oldProduct[0].nameCategory === req.body.nameCategory)) {
            await Categories.findOneAndUpdate(
                {},
                { $pull: { productChild: { _id: oldProduct[0]._id } } },
                { multi: true }
            );

            Product.findOneAndUpdate(
                { _id: req.body.id },
                {
                    nameProduct: req.body.nameProduct || oldProduct[0].nameProduct,
                    nameCategory: req.body.nameCategory,
                    priceProduct: req.body.priceProduct || oldProduct[0].priceProduct,
                    statusProduct: req.body.statusProduct,
                    inventoryProduct: req.body.inventoryProduct || oldProduct[0].inventoryProduct,
                    descriptionProduct:
                        req.body.descriptionProduct || oldProduct[0].descriptionProduct,
                    imageProduct: oldProduct[0].imageProduct,
                    cloudinaryId_imageProduct: oldProduct[0].cloudinaryId_imageProduct,
                },
                { new: true }
            )
                .then((productChild) => {
                    return Categories.findOneAndUpdate(
                        { slug: productChild.nameCategory },
                        { $push: { productChild: productChild } }
                    );
                })
                .then(() => {
                    res.status(200).json({ message: "Updated Successfully" });
                })
                .catch((err) => {
                    console.log(`${err} 3`);
                });
            return;
        }

        // if nameCategory have not changed
        Product.findOneAndUpdate(
            { _id: req.body.id },
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
                    { $push: { productChild: productChild } }
                );
            })
            .then(() => {
                res.status(200).json({ message: "Updated Successfully" });
            })
            .catch((err) => {
                console.log(`${err} 4`);
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

    // DELETE -> /admin/product/destroy/:id
    async productDestroy(req, res, next) {
        var [slugProduct, slugCategory, imageId] = req.params.information.split(",");

        Promise.all([
            Categories.findOneAndUpdate(
                { slug: slugCategory },
                { $pull: { productChild: { slug: slugProduct } } }
            ),
            Product.deleteOne({
                slug: slugProduct,
            }),
            cloudinary.uploader.destroy(imageId),
        ]).then(() => {
            res.redirect("back");
        });
    }

    // POST -> /admin/product/insert
    async productInsert(req, res, next) {
        // check user upload image
        if (!req.file?.path) return res.status(400).json({ message: "Your image is empty" });

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
                { $push: { productChild: newProductChild } }
            ).then((x) => {
                res.status(201).json(x);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AdminProductController();
