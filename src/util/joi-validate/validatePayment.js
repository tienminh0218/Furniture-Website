const Joi = require("joi");

/// Schema payment confirm
var schemaPaymentConfirm = Joi.object().keys({
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
                        err.message = "Email address should not be empty";
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

module.exports = { schemaPaymentConfirm };
