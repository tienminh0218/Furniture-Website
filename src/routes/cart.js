const express = require("express");
const route = express.Router();
const CartController = require("../app/controllers/CartController");

<<<<<<< HEAD
route.get("/", CartController.CartDetail);
route.delete("/delete/:id", CartController.CartDelete);
route.delete("/deleteAll", CartController.CartDeleteAll);
=======
route.get("/", CartController.cartDetail);
route.post("/add", CartController.addToCart);
route.delete("/delete/:id", CartController.cartDelete);
route.delete("/deleteAll", CartController.cartDeleteAll);
>>>>>>> 8fb91687f06b0026150c6b987edf5704ceb2fdba

module.exports = route;
