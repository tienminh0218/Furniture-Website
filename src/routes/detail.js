const express = require("express");
const route = express.Router();
const DetailController = require("../app/controllers/DetailController");

route.post("/", DetailController.addToCart);
route.get("/", DetailController.show);

module.exports = route;
