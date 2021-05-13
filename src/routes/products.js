const express = require("express");
const route = express.Router();
const AllProductController = require("../app/controllers/AllProductController");

route.get("/all", AllProductController.show);
route.get("/search", AllProductController.productSearch);
route.get("/:slugCategory", AllProductController.productChild);

module.exports = route;
