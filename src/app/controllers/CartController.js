const Account = require("../models/Account");
var Categories = require("../models/Category");
var Product = require("../models/Product");
var Cart = require("../models/Cart");
var Invoice = require("../models/Invoice");
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

    // Get -> /cart/checkout
    async checkoutCart(req, res, next) {
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

        let cart = await Cart.findOne({ "customer.username": decoded.name }).catch((err) =>
            console.log(err)
        );

        // check empty products
        let isEmpty = cart?.products.length;
        if (!isEmpty) {
            return res.redirect("back");
        }

        Promise.all([Categories.find({}), Account.findById({ _id: decoded.id_user })])
            .then(([categories, user]) => {
                res.render("checkoutCart", {
                    user: toObject(user),
                    categories: multipleToObject(categories),
                    cart: toObject(cart),
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Post -> /cart/checkoutOrder
    async checkoutOrder(req, res, next) {
        /// verify token in cookie
        try {
            var cookie = req.cookies;
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            console.log(error);
        }

        let [{ customer, products, totalPrice, totalQuantity }, existInvoice] = await Promise.all([
            Cart.findOne({
                "customer.username": decoded.name,
            }),
            Invoice.findOne({ "customer.username": decoded.name }),
        ]).catch((err) => console.log(err));

        // remove cart
        await Cart.deleteOne({ "customer.username": decoded.name }).catch((err) =>
            console.log(err)
        );

        let bill = {
            products,
            description: req.body.descriptionOrder || "",
            totalPrice,
            totalQuantity,
        };

        // first time payment
        if (!existInvoice) {
            /// create a new invoice
            let newInvoice = new Invoice({
                customer: {
                    username: decoded.name,
                    fullname: req.body.fullname || customer.fullname,
                    emailaddress: req.body.emailaddress || customer.emailaddress,
                    phonenumber: req.body.phonenumber || customer.emailaddress,
                    gender: customer.gender || customer.emailaddress,
                    address: req.body.address || customer.emailaddress,
                },
                bills: [bill],
            });

            await newInvoice.save().then(() => {
                res.status(201).json({ message: "Payment Successfully" });
            });
            return;
        }

        // invoice is already exist;
        Invoice.findOneAndUpdate(
            {
                "customer.username": decoded.name,
            },
            {
                $push: {
                    bills: bill,
                },
            }
        )
            .then(() => {
                res.status(201).json({ message: "Payment Successfully" });
            })
            .catch((err) => console.log(err));
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

            newCart
                .save()
                .then(() => {
                    res.status(201).json({ message: newCart });
                })
                .catch((err) => {
                    console.log(err);
                });
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
                },
                {
                    new: true,
                }
            )
                .then((result) => {
                    res.status(201).json({ message: result });
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
            },
            {
                new: true,
            }
        )
            .then((result) => {
                res.status(201).json({ message: result });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Delete -> /cart/:slugProduct
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
                $pull: { products: { slug: req.params.slugProduct } },
            }
        )
            .then((oldCart) => {
                return Cart.findOneAndUpdate(
                    { "customer.username": decoded.name },
                    {
                        totalPrice: oldCart.totalPrice - req.body.priceProduct,
                        totalQuantity: oldCart.totalQuantity - req.body.quantityProduct,
                    },
                    {
                        new: true,
                    }
                );
            })
            .then((cart) => {
                res.status(200).json({ message: cart });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Delete -> /cart/deleteAll
    cartDeleteAll(req, res, next) {
        var cookie = req.cookies;
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }

        Cart.findOneAndUpdate(
            {
                "customer.username": decoded.name,
            },
            {
                $pull: { products: { _id: { $in: req.body.arrListItems } } },
                totalPrice: 0,
                totalQuantity: 0,
            },
            { new: true }
        )
            .then((newCart) => {
                res.status(200).json({ message: newCart });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Patch -> /cart/
    async changeQuantity(req, res, next) {
        var cookie = req.cookies;
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }

        var oldCart = await Cart.findOne({
            "customer.username": decoded.name,
            "products._id": req.body.idProduct,
        });

        /// increase quantity
        if (req.body.option === 1) {
            let { products } = oldCart;
            let priceProduct;

            /// get price product
            products.forEach((product) => {
                if (product._id == req.body.idProduct) priceProduct = product.priceProduct;
            });
            Cart.findOneAndUpdate(
                { "customer.username": decoded.name, "products._id": req.body.idProduct },
                {
                    $inc: { "products.$.quantity": 1, totalQuantity: 1 },
                    totalPrice: oldCart.totalPrice + priceProduct,
                },
                {
                    new: true,
                }
            ).then((newCart) => {
                res.status(200).json({ message: newCart });
            });

            return;
        }

        /// decrease quantity
        let { products } = oldCart;
        let priceProduct;

        /// get price product
        products.forEach((product) => {
            if (product._id == req.body.idProduct) priceProduct = product.priceProduct;
        });
        Cart.findOneAndUpdate(
            { "customer.username": decoded.name, "products._id": req.body.idProduct },
            {
                $inc: { "products.$.quantity": -1, totalQuantity: -1 },
                totalPrice: oldCart.totalPrice - priceProduct,
            },
            {
                new: true,
            }
        ).then((newCart) => {
            let { products: newArrCarts } = newCart;
            let isPullProduct = false;
            newArrCarts.forEach((newArrCart) => {
                if (newArrCart._id == req.body.idProduct) {
                    if (newArrCart.quantity == 0) {
                        isPullProduct = true;
                        Cart.findOneAndUpdate(
                            { "customer.username": decoded.name },
                            {
                                $pull: { products: { _id: req.body.idProduct } },
                            },
                            {
                                new: true,
                            }
                        ).then((result) => {
                            res.status(200).json({ message: result });
                        });
                    }
                }
            });

            if (!isPullProduct) res.status(200).json({ message: newCart });
        });
    }
}
module.exports = new CartController();
