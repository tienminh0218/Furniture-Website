const Account = require("../models/Account");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");
const Categories = require("../models/Category");
const { multipleToObject } = require("../../util/toObj");
const escapeRegex = require("../../util/fuzzyRegex");

class AllProductController {
    // Get -> /all
    async show(req, res, next) {
        /// check is cookie exist
        var cookie = req.cookies;
        if (Object.keys(cookie).length == 0) {
            Promise.all([Categories.find({}), Product.find({})]).then(([categories, product]) => {
                res.render("products", {
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
            Cart.findOne({ "customer.username": decoded.name }),
        ]).then(([categories, user, product, cart]) => {
            res.render("products", {
                user: toObject(user),
                categories: multipleToObject(categories),
                product: multipleToObject(product),
                cart: toObject(cart),
            });
        });
    }

    // Get -> /products/search
    async productSearch(req, res, next) {
        /// check empty string
        if (!req.query.keyword) return res.status(200).json({ message: [] });

        // let nameProducts = new RegExp(`^${req.query.keyword}`, "i");
        let nameProducts = new RegExp(escapeRegex(req.query.keyword), "gi");
        Product.find({ nameProduct: nameProducts })
            .limit(6)
            .then((products) => {
                res.status(200).json({ message: products });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Get -> /all/:slugCategory
    async productChild(req, res, next) {
        let slugCategory = req.params.slugCategory;

        /// check is cookie exist
        var cookie = req.cookies;
        if (Object.keys(cookie).length == 0) {
            Promise.all([Categories.find({}), Product.find({ nameCategory: slugCategory })]).then(
                ([categories, product]) => {
                    res.render("products", {
                        user: false,
                        categories: multipleToObject(categories),
                        product: multipleToObject(product),
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
            Product.find({ nameCategory: slugCategory }),
            Cart.findOne({ "customer.username": decoded.name }),
        ]).then(([categories, user, product, cart]) => {
            res.render("products", {
                user: toObject(user),
                categories: multipleToObject(categories),
                product: multipleToObject(product),
                cart: toObject(cart),
            });
        });
    }
}

module.exports = new AllProductController();
