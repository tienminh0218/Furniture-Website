const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");
const upload = require("../util/multer");
const AdminProductController = require("../app/controllers/AdminProductController");
const AdminCategoryController = require("../app/controllers/AdminCategoryController");
const AdminInvoiceController = require("../app/controllers/AdminInvoiceController");

/// Categories routes
route.get("/category/insert", AdminCategoryController.categoryAdd);
route.get("/category/update", AdminCategoryController.categoryUpdateView);
route.put("/category/update", AdminCategoryController.categoryUpdate);
route.post("/category/insert", AdminCategoryController.categoryInsert);
route.get("/category", AdminCategoryController.category);
route.get("/category/bin", AdminCategoryController.categoryBin);
route.patch("/category/:id", AdminCategoryController.categoryBinRestore);
route.delete("/category/:id", AdminCategoryController.categoryDelete);

/// Products routes
route.get("/product/insert", AdminProductController.productAdd);
route.get("/product/update", AdminProductController.productUpdateView);
route.put("/product/update", upload.single("imageProduct"), AdminProductController.productUpdate);
route.post("/product/insert", upload.single("imageProduct"), AdminProductController.productInsert);
route.get("/product", AdminProductController.product);
route.get("/product/bin", AdminProductController.productBin);
route.patch("/product/:id", AdminProductController.productBinRestore);
route.delete("/product/destroy/:information", AdminProductController.productDestroy);
route.delete("/product/:id", AdminProductController.productDelete);

/// Invoice routes
route.get("/customers", AdminInvoiceController.listCustomers);
route.get("/customer/invoice", AdminInvoiceController.getInvoiceCustomer);
route.get("/customer/search", AdminInvoiceController.searchUser);
route.post("/customer/email/:id", AdminInvoiceController.sendMail);
route.get("/customer/:username", AdminInvoiceController.detailInvoice);

/// Home admin
route.get("/", AdminController.home);

module.exports = route;
