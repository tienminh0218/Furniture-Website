const Account = require("../models/Account");
const Categories = require("../models/Category");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");

const { multipleToObject } = require("../../util/toObj");

class DetailController {
    /// Get -> /detail
    async show(req, res, next) {
        /// check is cookie exist
        var cookie = req.cookies;
        if (Object.keys(cookie).length == 0) {
            Promise.all([Categories.find({}), Product.findById({ _id: req.query.id })])
                .then(([categories, product]) => {
                    res.render("details", {
                        user: false,
                        categories: multipleToObject(categories),
                        product: toObject(product),
                    });
                })
                .catch(() => {
                    res.redirect("/all");
                });
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
            Product.findById({ _id: req.query.id }),
            Cart.findOne({ "customer.username": decoded.name }),
        ]).then(([categories, user, product, cart]) => {
            res.render("details", {
                user: toObject(user),
                categories: multipleToObject(categories),
                product: toObject(product),
                cart: toObject(cart),
            });
        });
    }
}
module.exports = new DetailController();
