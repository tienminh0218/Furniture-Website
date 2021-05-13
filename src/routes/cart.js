const express = require("express");
const route = express.Router();
const CartController = require("../app/controllers/CartController");

route.get("/checkout", CartController.checkoutCart);
route.get("/", CartController.cartDetail);
route.post("/checkoutOrder", CartController.checkoutOrder);
route.post("/add", CartController.addToCart);
route.patch("/", CartController.changeQuantity);
route.delete("/delete", CartController.cartDeleteAll);
route.delete("/:slugProduct", CartController.cartDelete);

module.exports = route;
