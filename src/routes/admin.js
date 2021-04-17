const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");
const upload = require("../util/multer");

/// Categories
route.get("/category/insert", AdminController.categoryAdd);
route.post("/category/insert", AdminController.categoryInsert);
route.get("/category", AdminController.category);

/// Products
route.get("/product/insert", AdminController.productAdd);
route.post("/product/insert", upload.single("imageProduct"), AdminController.productInsert);
route.get("/product", AdminController.product);

/// Home admin
route.get("/", AdminController.home);

module.exports = route;
