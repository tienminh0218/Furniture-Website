const Account = require("../models/Account");
const Cart = require("../models/Cart");
var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");

const Categories = require("../models/Category");
const { multipleToObject } = require("../../util/toObj");
class HomeController {
    /// Get -> /
    async show(req, res, next) {
        var cookie = req.cookies;
        /// check is cookie exist
        if (Object.keys(cookie).length == 0)
            return res.render("home", {
                user: false,
                categories: multipleToObject(categories),
            });

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
        ]).then(([categories, user, cart]) => {
            res.render("home", {
                user: toObject(user),
                categories: multipleToObject(categories),
                cart: toObject(cart),
            });
        });
    }
}

module.exports = new HomeController();
