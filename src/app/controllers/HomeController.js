const Account = require("../models/Account");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Categories = require("../models/Category");

var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");
const { multipleToObject } = require("../../util/toObj");
class HomeController {
    /// Get -> /
    async show(req, res, next) {
        var cookie = req.cookies;
        /// check is cookie exist
        if (Object.keys(cookie).length == 0) {
            Promise.all([Categories.find({}), Product.find({}).sort({ _id: -1 }).limit(10)]).then(
                ([categories, products]) => {
                    res.render("home", {
                        user: false,
                        categories: multipleToObject(categories),
                        products: multipleToObject(products),
                    });
                }
            );
            return;
        }

        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }

        Promise.all([
            Categories.find({}),
            Account.findById({ _id: decoded.id_user }),
            Cart.findOne({ "customer.username": decoded.name }),
            Product.find({}).sort({ _id: -1 }).limit(10),
        ]).then(([categories, user, cart, products]) => {
            res.render("home", {
                user: toObject(user),
                categories: multipleToObject(categories),
                cart: toObject(cart),
                products: multipleToObject(products),
            });
        });
    }
}

module.exports = new HomeController();
