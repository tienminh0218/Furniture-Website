class AdminController {
    home(req, res, next) {
        res.render("admin-content", { layout: "admin" });
    }
}

module.exports = new AdminController();
