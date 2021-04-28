const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");
const upload = require("../util/multer");

/// Categories
route.get("/category/insert", AdminController.categoryAdd);
route.get("/category/update", AdminController.categoryUpdateView);
route.put("/category/update", AdminController.categoryUpdate);
route.post("/category/insert", AdminController.categoryInsert);
route.get("/category", AdminController.category);
route.get("/category/bin", AdminController.categoryBin);
route.patch("/category/:id", AdminController.categoryBinRestore);
route.delete("/category/:id", AdminController.categoryDelete);

/// Products
route.get("/product/insert", AdminController.productAdd);
route.get("/product/update", AdminController.productUpdateView);
route.put("/product/update/:id", upload.single("imageProduct"), AdminController.productUpdate);
route.post("/product/insert", upload.single("imageProduct"), AdminController.productInsert);
route.get("/product", AdminController.product);
route.get("/product/bin", AdminController.productBin);
route.patch("/product/:id", AdminController.productBinRestore);
route.delete("/product/:id", AdminController.productDelete);

/// Home admin
route.get("/", AdminController.home);

module.exports = route;
