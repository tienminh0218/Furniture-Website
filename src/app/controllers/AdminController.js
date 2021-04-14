class AdminController {
    /// Get -> /admin/
    home(req, res, next) {
        res.render("admin-body/admin-home", { layout: "admin" });
    }

    /// Get -> /admin/category
    category(req, res, next) {
        res.render("admin-body/admin-category", { layout: "admin" });
    }

    /// Get -> /admin/category/insert
    categoryInsert(req, res, next) {
        res.render("admin-body/admin-categoryInsert", { layout: "admin" });
    }
}

module.exports = new AdminController();
