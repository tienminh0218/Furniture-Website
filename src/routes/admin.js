const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");

route.get("/category/insert", AdminController.categoryAdd);
route.post("/category/insert", AdminController.categoryInsert);
route.get("/category", AdminController.category);
route.get("/", AdminController.home);

module.exports = route;
