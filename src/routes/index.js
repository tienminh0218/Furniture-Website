const accounts = require("./accounts");
const home = require("./home");
const admin = require("./admin");
const detail = require("./detail");
const allProducts = require("./allProduct");
const cart = require("./cart");
const { checkAdmin } = require("../app/middleware/middleware.js");

function route(app, express, path) {
    app.use("/account", accounts);
    app.use("/admin", checkAdmin, admin);
    app.use("/detail", detail);
    app.use("/all", allProducts);
    app.use("/cart", cart);
    app.use("/", home);
}

module.exports = route;
