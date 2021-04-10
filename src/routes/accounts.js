const express = require("express");
const route = express.Router();
const AccountController = require("../app/controllers/AccountController.js");

route.post("/login", AccountController.login);
route.post("/register", AccountController.register);
route.get("/admin", (req, res) => {
    res.render("admin-content", { layout: "admin" });
});

module.exports = route;
