const categorysProduct = require("./categorys");
const accounts = require("./accounts");
const home = require("./home");
const admin = require("./admin");

function route(app) {
    app.use("/me/categorys", categorysProduct);
    app.use("/account", accounts);
    app.use("/admin", admin);
    app.use("/details", (req, res, next) => res.render("details"));
    app.use("/", home);
}

module.exports = route;
