var Categories = require("../models/Category");
var Product = require("../models/Product");
const Joi = require("joi");
var { multipalToObject } = require("../../util/toObj");
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
        res.render("admin-body/admin-productInsert", { layout: "admin" });
    }
    // POST -> /admin/product/insert
    productInsert(req, res, next) {
        var schema = Joi.object({
            nameProduct: Joi.string().min(6).max(100).required(),
            nameCategory: Joi.string().min(6).max(100).required(),
            priceProduct: Joi.number().required(),
            descriptionProduct: Joi.string().required(),
            imageProduct: Joi.string(),
            statusProduct: Joi.string().min(6).max(100).required(),
            inventoryProduct: Joi.number().required(),
        });
    }
}

module.exports = new AdminController();
