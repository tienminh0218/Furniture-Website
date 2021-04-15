const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");

route.get("/category/insert", AdminController.categoryAdd);
route.post("/category/insert", AdminController.categoryInsert);
route.get("/category", AdminController.category);
route.get("/product/insert", AdminController.productAdd);
route.post("/product/insert", AdminController.productInsert);
route.get("/product", AdminController.product);
route.get("/", AdminController.home);

module.exports = route;
