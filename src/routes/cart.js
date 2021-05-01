const express = require("express");
const route = express.Router();
const CartController = require("../app/controllers/CartController");

route.get("/", CartController.cartDetail);
route.post("/", CartController.addToCart);
route.delete("/delete/:id", CartController.cartDelete);
route.delete("/deleteAll", CartController.cartDeleteAll);

module.exports = route;
