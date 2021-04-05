const express = require("express");
const route = express.Router();
const Account = require("../app/models/Account");

route.post("/", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
});

module.exports = route;
