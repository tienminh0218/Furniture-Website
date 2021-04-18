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
var schemaRegisterAccount = Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().alphanum().min(6).max(30).required(),
    fullname: Joi.string().min(6).max(50).required(),
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
