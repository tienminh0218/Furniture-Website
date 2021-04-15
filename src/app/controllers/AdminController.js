var Categorys = require("../models/Category");
const Joi = require("joi");
var { multipalToObject } = require("../../util/toObj");
class AdminController {
    /// Get -> /admin/
    home(req, res, next) {
        res.render("admin-body/admin-home", { layout: "admin" });
    }

    /// Get -> /admin/category
    category(req, res, next) {
        Categorys.find({}).then((categorys) => {
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
        console.log(req.body);
        // return;
        var newCategory = new Categorys(req.body);
        newCategory.isNew = false;
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
            username: Joi.string().alphanum().min(4).max(30).required(),
            password: Joi.string().alphanum().min(6).max(30).required(),
        });
    }
}

module.exports = new AdminController();
