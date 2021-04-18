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
                        err.message = `Á đù má định hack à`;
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
                        err.message = `Á đù má định hack à`;
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
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Phone number should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Phone number should have at least ${err.local.limit} characters!`;
                        break;
                    case "string.min":
                        err.message = `Phone number should have at most ${err.local.limit} characters!`;
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
                        err.message = "Address should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Address should have at least ${err.local.limit} characters!`;
                        break;
                    case "string.min":
                        err.message = `Address should have at most ${err.local.limit} characters!`;
                        break;
                    case "string.pattern.base":
                        err.message = "Ghi đúng địa chỉ anh ơi!!!!";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaLoginAccount, schemaRegisterAccount };
