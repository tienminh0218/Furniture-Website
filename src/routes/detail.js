const express = require("express");
const route = express.Router();
const DetailController = require("../app/controllers/DetailController");

route.get("/", DetailController.show);

module.exports = route;
