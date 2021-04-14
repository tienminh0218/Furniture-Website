const accounts = require("./accounts");
const home = require("./home");
const admin = require("./admin");

function route(app, express, path) {
    app.use("/account", accounts);

    app.use("/admin", admin);

    app.use("/details", (req, res, next) => res.render("details"));

    app.use("/", home);
}

module.exports = route;
