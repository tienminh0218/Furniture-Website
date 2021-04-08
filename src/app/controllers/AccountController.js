const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");

class AccountController {
    // POST -> /account/login
    async login(req, res, next) {
        /// Validate form
        var schema = Joi.object({
            username: Joi.string().alphanum().min(4).max(30).required(),
            password: Joi.string().alphanum().min(6).max(30).required(),
        });

        const checked = await schema.validate({
            username: req.body.username,
            password: req.body.password,
        });
        var { error } = checked;
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });

        /// Check an exist account
        var isAccountExist = await Account.findOne({
            username: req.body.username,
        });

        if (!isAccountExist)
            return res
                .status(400)
                .json({ message: "Your account not found!!" });

        /// Create a token
        var secret = process.env.SECRECT;
        var token = jwt.sign(
            {
                id_user: isAccountExist._id,
                name: isAccountExist.username,
            },
            secret
        );

        var checkPassword = await bcrypt.compare(
            req.body.password,
            isAccountExist.password
        );

        /// Check password
        if (!checkPassword)
            return res
                .status(400)
                .json({ message: "Your password or username is incorrect" });

        /// Login success and create a cookie
        res.status(200).cookie("token", token).json({
            message: "Wellcome",
            token,
        });
    }

    // POST -> /account/register
    async register(req, res, next) {
        /// Check username account is exist
        var isExistAccount = await Account.findOne({
            username: req.body.username,
        });

        if (isExistAccount) {
            res.status(409).send("username already exist!!! ");
            return;
        } else {
            var hashedPassword = await bcrypt.hash(req.body.password, 10);

            var newAccount = new Account({
                username: req.body.username,
                password: hashedPassword,
                fullname: req.body.fullname,
                phonenumber: req.body.phonenumber,
                address: req.body.address,
            });
            // Create a new account
            newAccount
                .save()
                .then((account) => {
                    res.status(201).json({
                        message: "Created successfully",
                        account,
                    });
                })
                .catch(next);
        }
    }
}

module.exports = new AccountController();
