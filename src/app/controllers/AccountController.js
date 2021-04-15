const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");

class AccountController {
    // POST -> /account/login
    async login(req, res, next) {
        /// Schema form
        var schema = Joi.object({
            username: Joi.string().alphanum().min(4).max(30).required(),
            password: Joi.string().alphanum().min(6).max(30).required(),
        });

        /// Validate form
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
        res.status(200).cookie("token", token).json({
            message: "Wellcome",
            token,
        });
    }
    // POST -> /account/register
    async register(req, res, next) {
        /// Schema form
        var schema = Joi.object({
            username: Joi.string().alphanum().min(4).max(30).required(),
            password: Joi.string().alphanum().min(6).max(30).required(),
            fullname: Joi.string().min(6).max(50).required(),
            phonenumber: Joi.number().min(6).max(11).required(),
            gender: Joi.string().min(1).required(),
            address: Joi.string()
                .pattern(/^[a-zA-Z0-9--/,]/)
                .min(6)
                .max(100)
                .required(),
        });

        /// Check username account is exist
        var isExistAccount = await Account.findOne({
            username: req.body.username,
        });

        if (isExistAccount) {
            res.status(409).json({
                message: "username already exist",
            });
            return;
        }

        /// Validate form
        const checked = await schema.validate({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            phonenumber: req.body.phonenumber,
            gender: req.body.gender,
            address: req.body.address,
        });
        var { error } = checked;
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });

        var hashedPassword = await bcrypt.hash(req.body.password, 10);

        var newAccount = new Account({
            username: req.body.username,
            password: hashedPassword,
            fullname: req.body.fullname,
            phonenumber: req.body.phonenumber,
            gender: req.body.gender,
            address: req.body.address,
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
