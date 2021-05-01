const Account = require("../models/Account");
var Categories = require("../models/Category");
var Product = require("../models/Product");
var Cart = require("../models/Cart");
var jwt = require("jsonwebtoken");
var { multipleToObject, toObject } = require("../../util/toObj");

class CartController {
    // Get -> /cart
    async cartDetail(req, res, next) {
        var cookie = req.cookies;
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }
        Promise.all([
            Account.findById({ _id: decoded.id_user }),
            Cart.find({ customer: [{ username: decoded.name }] }),
        ]).then(([categories, user, cart]) => {
            res.render("cart");
        });
    }

    // Delete -> /cart/delete
    cartDelete(req, res, next) {
        console.log("ok");
    }

    // Delete -> /cart/deleteAll
    cartDeleteAll(req, res, next) {}
}
module.exports = new CartController();
