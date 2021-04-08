const categorysProduct = require("./categorys");
const accounts = require("./accounts");
const home = require("./home");

function route(app) {
    app.use("/me/categorys", categorysProduct);
    app.use("/account", accounts);
    ///test details
    app.use("/details", (req, res, next) => res.render("details"));
    app.use("/", home);
}

module.exports = route;
