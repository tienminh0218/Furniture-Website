var Categories = require("../models/Category");
var Product = require("../models/Product");
var Cart = require("../models/Cart");
var { multipleToObject, toObject } = require("../../util/toObj");

class CartController {
    // Get -> /cart/
    cartDetail(req, res, next) {
        res.render("cart");
    }

    // Post -> /cart/add
    addToCart(req, res, next) {
        // Product.findOne({ _id: req.body.id });
        // .then(product =>)
    }

    // Delete -> /cart/delete
    cartDelete(req, res, next) {
        console.log("ok");
    }

    // Delete -> /cart/deleteAll
    cartDeleteAll(req, res, next) {
        console.log("ok");
    }
}
module.exports = new CartController();
