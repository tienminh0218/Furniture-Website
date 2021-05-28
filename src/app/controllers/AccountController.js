const Account = require("../models/Account");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Categories = require("../models/Category");
const Invoice = require("../models/Invoice");

const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");

var { toObject } = require("../../util/toObj");
const { multipleToObject } = require("../../util/toObj");

/// upload file
const cloudinary = require("../../util/cloudinary");
const upload = require("../../util/multer");

/// schema validate
var JoiSchemaAccount = require("../../util/joi-validate/validateAccount");

class AccountController {
    // POST -> /account/login
    async login(req, res) {
        /// Validate form
        const checked = await JoiSchemaAccount.schemaLoginAccount.validate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            { abortEarly: false }
        );
        var { error } = checked;
        if (error)
            return res.status(400).json({
                message: error.details,
            });

        /// Check an exist account
        var isAccountExist = await Account.findOne({
            username: req.body.username,
        });

        if (!isAccountExist)
            return res.status(400).json({ message: "Your account not found" });

        var checkPassword = await bcrypt.compare(
            req.body.password,
            isAccountExist.password
        );

        /// Check password
        if (!checkPassword)
            return res
                .status(400)
                .json({ message: "Your password or username is incorrect" });

        /// Create a token
        var secret = process.env.SECRECT;
        var token = jwt.sign(
            {
                id_user: isAccountExist._id,
                name: isAccountExist.username,
            },
            secret
        );

        /// Login success and create a cookie
        res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 24 * 3600000),
            })
            .json({
                message: "Wellcome",
                token,
            });
    }

    // POST -> /account/register
    async register(req, res) {
        //set role user
        req.body?.role ? req.body.role : (req.body.role = 1);

        /// Check username account is exist
        var isExistAccount = await Account.findOne({
            username: req.body.username,
        });

        if (isExistAccount) {
            res.status(409).json({
                message: "Username already exist",
            });
            return;
        }

        /// Validate form
        const checked = await JoiSchemaAccount.schemaRegisterAccount.validate(
            {
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname,
                phonenumber: req.body.phonenumber,
                emailaddress: req.body.emailaddress,
                gender: req.body.gender,
                address: req.body.address,
            },
            { abortEarly: false }
        );
        var { error } = checked;
        if (error) {
            res.status(400).json({
                message: error.details,
            });
            return;
        }

        var hashedPassword = await bcrypt.hash(req.body.password, 10);

        var newAccount = new Account({
            username: req.body.username,
            password: hashedPassword,
            fullname: req.body.fullname,
            phonenumber: req.body.phonenumber,
            emailaddress: req.body.emailaddress,
            gender: req.body.gender,
            address: req.body.address,
            role: req.body.role,
        });

        // Create a new account
        newAccount
            .save()
            .then((account) => {
                res.status(201).json({
                    message: "Created successfully!!!",
                    account,
                });
            })
            .catch((err) => console.log({ err }));
    }

    //GET -> /account/profile
    profileUser(req, res) {
        Promise.all([
            Categories.find({}),
            Cart.findOne({ "customer.username": req.user.username }),
            Product.find({}).sort({ _id: -1 }).limit(10),
        ]).then(([categories, cart, products]) => {
            res.render("user-profile", {
                user: toObject(req.user),
                categories: multipleToObject(categories),
                cart: toObject(cart),
                products: multipleToObject(products),
            });
        });
    }

    //PATCH -> /account/profile
    async updateProfile(req, res) {
        /// Validate form
        const checked = await JoiSchemaAccount.schemaUpdateAccount.validate(
            {
                fullname: req.body.fullname,
                phonenumber: req.body.phonenumber,
                emailaddress: req.body.emailaddress,
                gender: req.body.gender,
                address: req.body.address,
            },
            { abortEarly: false }
        );
        var { error } = checked;
        if (error) {
            res.status(400).json({
                message: error.details,
            });
            return;
        }

        /// update account ///
        const userInformation = {
            fullname: req.body.fullname,
            emailaddress: req.body.emailaddress,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
        };

        // check user do not upload image
        if (!req.file?.path) {
            Promise.all([
                Account.findOneAndUpdate(
                    { username: req.user.username },
                    userInformation
                ),
                Cart.findOneAndUpdate(
                    { "customer.username": req.user.username },
                    { $set: { customer: userInformation } }
                ),
                Invoice.findOneAndUpdate(
                    { "customer.username": req.user.username },
                    { $set: { customer: userInformation } }
                ),
            ])
                .then(([newUser, newCart, newInvoice]) => {
                    res.status(200).json({
                        success: true,
                        message: "Updated successfully",
                    });
                })
                .catch((err) => console.log(err));

            return;
        }

        /// first time upload image
        let isImageExist = req.user.imageUser?.id;
        if (!isImageExist) {
            try {
                /// Upload image to cloudinary
                const result_uploadImage = await cloudinary.uploader.upload(
                    req.file.path
                );
                const userWithImage = {
                    ...userInformation,
                    imageUser: {
                        link: result_uploadImage.url,
                        id: result_uploadImage.public_id,
                    },
                };

                Promise.all([
                    Account.findOneAndUpdate(
                        { username: req.user.username },
                        userWithImage
                    ),
                    Cart.findOneAndUpdate(
                        { "customer.username": req.user.username },
                        { $set: { customer: userInformation } }
                    ),
                    Invoice.findOneAndUpdate(
                        { "customer.username": req.user.username },
                        { $set: { customer: userInformation } }
                    ),
                ])
                    .then(([newUser, newCart, newInvoice]) => {
                        res.status(200).json({
                            success: true,
                            message: "Updated successfully",
                        });
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                console.log(error);
            }

            return;
        }

        /// user change information and new image
        try {
            /// Upload image to cloudinary
            const [result_uploadImage] = await Promise.all([
                cloudinary.uploader.upload(req.file.path),
                cloudinary.uploader.destroy(req.user.imageUser.id),
            ]);

            const userWithImage = {
                ...userInformation,
                imageUser: {
                    link: result_uploadImage.url,
                    id: result_uploadImage.public_id,
                },
            };

            Promise.all([
                Account.findOneAndUpdate(
                    { username: req.user.username },
                    userWithImage
                ),
                Cart.findOneAndUpdate(
                    { "customer.username": req.user.username },
                    { $set: { customer: userInformation } }
                ),
                Invoice.findOneAndUpdate(
                    { "customer.username": req.user.username },
                    { $set: { customer: userInformation } }
                ),
            ])
                .then(([newUser, newCart, newInvoice]) => {
                    res.status(200).json({
                        success: true,
                        message: "Updated successfully",
                    });
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AccountController();
