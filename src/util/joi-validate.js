const Joi = require("joi");

/// Schema account login form
var schemaLoginAccount = Joi.object({
    username: Joi.string()
        .error(() => "string message")
        .alphanum()
        .error(() => "alphanum message")
        .min(4)
        .error(() => "min message")
        .max(30)
        .error(() => "max message")
        .required()
        .error(() => "required message"),
    password: Joi.string().alphanum().min(6).max(30).required(),
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
