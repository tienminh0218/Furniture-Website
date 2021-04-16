const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");

/// Categories
route.get("/category/insert", AdminController.categoryAdd);
route.post("/category/insert", AdminController.categoryInsert);
route.get("/category", AdminController.category);

/// Products
route.get("/product/insert", AdminController.productAdd);
route.get("/product/insert", AdminController.productInsert);
route.post("/product/insert", AdminController.productInsert);
route.get("/product", AdminController.product);

/// Home admin
route.get("/", AdminController.home);

module.exports = route;
