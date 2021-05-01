const express = require("express");
const route = express.Router();
const CartController = require("../app/controllers/CartController");

route.post("/", CartController.CartDetail);
route.get("/delete/:id", CartController.CartDelete);
route.delete("/deleteAll", CartController.CartDeleteAll);

module.exports = route;
