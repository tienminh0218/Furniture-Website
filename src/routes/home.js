var exports = require("express");
var route = exports.Router();
var HomeController = require("../app/controllers/HomeController");
route.get("/", HomeController.show);

module.exports = route;
