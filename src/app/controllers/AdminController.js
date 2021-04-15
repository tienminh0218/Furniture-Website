var Categorys = require("../models/Category");
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
        var newCategory = new Categorys(req.body);
        newCategory
            .save()
            .then((newCategory) => {
                res.status(201).redirect("/admin/category");
            })
            .catch((err) => console.error(err));
    }
}

module.exports = new AdminController();
