const express = require("express");
const route = express.Router();
const CartController = require("../app/controllers/CartController");

route.get("/", CartController.CartDetail);
route.delete("/delete/:id", CartController.CartDelete);
route.delete("/deleteAll", CartController.CartDeleteAll);

module.exports = route;
