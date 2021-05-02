const Account = require("../models/Account");
var Categories = require("../models/Category");
var Product = require("../models/Product");
var Cart = require("../models/Cart");
var jwt = require("jsonwebtoken");
var { multipleToObject, toObject } = require("../../util/toObj");

class CartController {
    // Get -> /cart
    async cartDetail(req, res, next) {
        /// check is cookie exist
        var cookie = req.cookies;
        if (Object.keys(cookie).length == 0) {
            res.redirect("back");
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
        ])
            .then(([categories, user, cart]) => {
                res.render("cart", {
                    user: toObject(user),
                    categories: multipleToObject(categories),
                    cart: toObject(cart),
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Post -> /cart/add
    async addToCart(req, res, next) {
        var cookie = req.cookies;
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }

        var [product, user, cartUser] = await Promise.all([
            Product.findOne({ _id: req.body.id }),
            Account.findOne({ _id: decoded.id_user }),
            Cart.findOne({ "customer.username": decoded.name }),
        ]);

        /// total price
        let totalPricePerProduct = +req.body.quantity * +product.priceProduct;

        /// if userCart not exists
        if (!cartUser) {
            let newCart = new Cart({
                customer: {
                    username: user.username,
                    fullname: user.fullname,
                    emailaddress: user.emailaddress,
                    phonenumber: user.phonenumber,
                    gender: user.gender,
                    address: user.address,
                },
                products: [
                    {
                        nameProduct: product.nameProduct,
                        priceProduct: product.priceProduct,
                        quantity: req.body.quantity,
                        imageProduct: product.imageProduct,
                        nameCategory: product.nameCategory,
                        slug: product.slug,
                    },
                ],
                totalPrice: totalPricePerProduct,
                totalQuantity: req.body.quantity,
            });

            newCart.save();
            res.status(201).json({ message: "Add to cart successfully" });
            return;
        }

        /// cartUser is exists
        var {
            products: productCartUser,
            totalPrice: oldTotalPrice,
            totalQuantity: oldQuantity,
        } = cartUser;
        var isProductExists = false;
        /// loop all product in cartUser
        productCartUser.forEach((childProduct) => {
            if (childProduct.slug === product.slug) {
                isProductExists = true;
            }
        });

        /// if product not exists
        if (!isProductExists) {
            Cart.findOneAndUpdate(
                { "customer.username": decoded.name },
                {
                    $push: {
                        products: {
                            nameProduct: product.nameProduct,
                            priceProduct: product.priceProduct,
                            quantity: req.body.quantity,
                            imageProduct: product.imageProduct,
                            nameCategory: product.nameCategory,
                            slug: product.slug,
                        },
                    },
                    totalPrice: oldTotalPrice + totalPricePerProduct,
                    totalQuantity: +oldQuantity + +req.body.quantity,
                }
            )
                .then(() => {
                    res.status(201).json({ message: "Add to cart successfully" });
                })
                .catch((err) => {
                    console.log(err);
                });
            return;
        }

        /// if product exists
        var newQuantityProduct;
        var oldProduct = await Cart.findOneAndUpdate(
            { "customer.username": decoded.name },
            { $pull: { products: { slug: product.slug } } }
        );
        oldProduct.products.forEach((oldProductChild) => {
            if (oldProductChild.slug == product.slug) {
                newQuantityProduct = oldProductChild.quantity;
            }
        });

        Cart.findOneAndUpdate(
            { "customer.username": decoded.name },
            {
                $push: {
                    products: {
                        nameProduct: product.nameProduct,
                        priceProduct: product.priceProduct,
                        quantity: +req.body.quantity + +newQuantityProduct,
                        imageProduct: product.imageProduct,
                        nameCategory: product.nameCategory,
                        slug: product.slug,
                    },
                },
                totalPrice: oldTotalPrice + totalPricePerProduct,
                totalQuantity: +oldQuantity + +req.body.quantity,
            }
        )
            .then(() => {
                res.status(201).json({ message: "Add to cart successfully" });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Delete -> /cart/:id
    async cartDelete(req, res, next) {
        var cookie = req.cookies;
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }
        Cart.findOneAndUpdate(
            { "customer.username": decoded.name },
            {
                $pull: { products: { _id: req.params.id } },
            }
        )
            .then((oldCart) => {
                return Cart.findOneAndUpdate(
                    { "customer.username": decoded.name },
                    {
                        totalPrice: oldCart.totalPrice - req.body.priceProduct,
                        totalQuantity: oldCart.totalQuantity - req.body.quantityProduct,
                    }
                );
            })
            .then(() => {
                res.status(200).json({ message: "Delete done" });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Delete -> /cart/deleteAll
    cartDeleteAll(req, res, next) {}
}
module.exports = new CartController();
