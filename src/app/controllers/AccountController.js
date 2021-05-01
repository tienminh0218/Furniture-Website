const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");

/// schema validate
var JoiSchemaAccount = require("../../util/joi-validate/validateAccount");

class AccountController {
    // POST -> /account/login
    async login(req, res, next) {
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
    async register(req, res, next) {
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
}

module.exports = new AccountController();
