var Categories = require("../models/Category");
var Product = require("../models/Product");
var Cart = require("../models/Cart");
var { multipleToObject, toObject } = require("../../util/toObj");

class CartController {
    // Get -> /cart
    async CartDetail(req, res, next) {
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }
        Promise.all([
            Account.findById({ _id: decoded.id_user }),
            cart.find({ customer: [{ username: decoded.name }] }),
        ]).then(([categories, user, cart]) => {
            res.render("cart", {
                user: toObject(user),
                cart: toObject(cart),
            });
        });
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
