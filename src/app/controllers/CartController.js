var Categories = require("../models/Category");
var Product = require("../models/Product");
var Cart = require("../models/Cart");
var { multipleToObject, toObject } = require("../../util/toObj");

class CartController {
    // Post -> /cart/detail
    CartDetail(req, res, next) {
        console.log("ok");
    }
    // Delete -> /cart/delete
    CartDelete(req, res, next) {
        console.log("ok");
    }
    // Delete -> /cart/deleteAll
    CartDeleteAll(req, res, next) {
        console.log("ok");
    }
}
module.exports = new CartController();
