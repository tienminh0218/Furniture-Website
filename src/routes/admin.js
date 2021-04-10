const express = require("express");
const route = express.Router();
const AdminController = require("../app/controllers/AdminController");

route.get("/", AdminController.home);

module.exports = route;
