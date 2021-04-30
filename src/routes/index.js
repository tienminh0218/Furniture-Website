const accounts = require("./accounts");
const home = require("./home");
const admin = require("./admin");
const detail = require("./detail");
const allProducts = require("./allProduct");

function route(app, express, path) {
    app.use("/account", accounts);
    app.use("/admin", admin);
    app.use("/detail", detail);
    app.use("/all", allProducts);
    app.use("/", home);
}

module.exports = route;
