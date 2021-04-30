const express = require("express");
const route = express.Router();
const AllProductController = require("../app/controllers/AllProductController");

route.get("/", AllProductController.show);

module.exports = route;
