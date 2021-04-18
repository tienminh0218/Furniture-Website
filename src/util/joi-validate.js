const Joi = require("joi");

/// Schema account login form
var schemaLoginAccount = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().alphanum().min(6).max(30).required(),
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
                        err.message = "Account should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Account should have at least ${err.local.limit} characters!`;
                        break;
                    case "string.max":
                        err.message = `Account should have at most ${err.local.limit} characters!`;
                        break;
                    case "string.alphanum":
                        err.message = "Đừng hack em anh ơi!!!!";
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
                        err.message = "Password should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Password should have at least ${err.local.limit} characters!`;
                        break;
                    case "string.min":
                        err.message = `Password should have at most ${err.local.limit} characters!`;
                        break;
                    case "string.alphanum":
                        err.message = "Đừng hack em anh ơi!!!!";
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
                        err.message = "Full name should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Full name should have at least ${err.local.limit} characters!`;
                        break;
                    case "string.min":
                        err.message = `Full name should have at most ${err.local.limit} characters!`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    phonenumber: Joi.string()
        .pattern(/^[A-Z0-9-]/)
        .min(6)
        .max(11)
        .required(),
    gender: Joi.string().min(1).required(),
    address: Joi.string()
        .pattern(/^[a-zA-Z0-9--/,]/)
        .min(6)
        .max(100)
        .required(),
});

module.exports = { schemaLoginAccount, schemaRegisterAccount };
