const Account = require("../models/Account");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Categories = require("../models/Category");

const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");

var { toObject } = require("../../util/toObj");
const { multipleToObject } = require("../../util/toObj");

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

        if (!isAccountExist) return res.status(400).json({ message: "Your account not found" });

        var checkPassword = await bcrypt.compare(req.body.password, isAccountExist.password);

        /// Check password
        if (!checkPassword)
            return res.status(400).json({ message: "Your password or username is incorrect" });

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
            .catch(next);
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

        // check user upload image
        if (!req.file?.path) return res.status(400).json({ message: "Your image is empty" });

        /// update account
        console.log(req.user);
    }
}

module.exports = new AccountController();
