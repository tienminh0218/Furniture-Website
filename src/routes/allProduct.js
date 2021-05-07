const express = require("express");
const route = express.Router();
const AllProductController = require("../app/controllers/AllProductController");

route.get("/", AllProductController.show);
route.get("/search", AllProductController.productSearch);

module.exports = route;
