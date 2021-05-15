const Joi = require("joi");

/// Schema account login form
var schemaLoginAccount = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Username should not be empty";
                        break;
                    case "string.min":
                        err.message = `Username should have at least ${err.local.limit}  characters`;
                        break;
                    case "string.max":
                        err.message = `Username should have at most ${err.local.limit}  characters`;
                        break;
                    case "string.alphanum":
                        err.message = `Invalid your username`;
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    password: Joi.string()
        .alphanum()
        .min(6)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Password should not be empty";
                        break;
                    case "string.min":
                        err.message = `Password should be at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Password should be at most ${err.local.limit} characters`;
                        break;
                    case "string.alphanum":
                        err.message = `Invalid your password`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

/// Schema account register form
var schemaRegisterAccount = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Account should not be empty";
                        break;
                    case "string.min":
                        err.message = `Account should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Account should have at most ${err.local.limit} characters`;
                        break;
                    case "string.alphanum":
                        err.message =
                            "Account can not contain special characters";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Password should not be empty";
                        break;
                    case "string.min":
                        err.message = `Password should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Password should have at most ${err.local.limit} characters`;
                        break;
                    case "string.alphanum":
                        err.message = "Đừng hack em anh ơi";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    fullname: Joi.string()
        .min(6)
        .max(50)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Full name should not be empty";
                        break;
                    case "string.min":
                        err.message = `Full name should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Full name should have at most ${err.local.limit} characters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    phonenumber: Joi.string()
        .pattern(/^[0-9]*$/)
        .min(10)
        .max(11)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Phone number should not be empty";
                        break;
                    case "string.min":
                        err.message = `Phone number should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Phone number should have at most ${err.local.limit} characters`;
                        break;
                    case "string.pattern.base":
                        err.message = "Phone number should be a number";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    gender: Joi.string().min(1).required(),
    emailaddress: Joi.string()
        .pattern(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Address should not be empty";
                        break;
                    case "string.pattern.base":
                        err.message = "You must entered an valid email address";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    address: Joi.string()
        .pattern(/^[a-zA-Z0-9--/,]/)
        .min(6)
        .max(100)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Address should not be empty";
                        break;
                    case "string.min":
                        err.message = `Address should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Address should have at most ${err.local.limit} characters`;
                        break;
                    case "string.pattern.base":
                        err.message =
                            "Address can not contain special characters";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaLoginAccount, schemaRegisterAccount };
