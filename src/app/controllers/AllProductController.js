const Account = require("../models/Account");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");

const Categories = require("../models/Category");
const Product = require("../models/Product");
const { multipleToObject } = require("../../util/toObj");

class AllProductController {
    // Get -> /all
    async show(req, res, next) {
        /// check is cookie exist
        var cookie = req.cookies;
        if (Object.keys(cookie).length == 0) {
            Promise.all([Categories.find({}), Product.find({})]).then(([categories, product]) => {
                res.render("allProducts", {
                    user: false,
                    categories: multipleToObject(categories),
                    product: multipleToObject(product),
                });
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
            Product.find({}),
        ]).then(([categories, user, product]) => {
            res.render("allProducts", {
                user: toObject(user),
                categories: multipleToObject(categories),
                product: multipleToObject(product),
            });
        });
    }
}

module.exports = new AllProductController();
