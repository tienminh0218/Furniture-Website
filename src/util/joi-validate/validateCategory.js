const Joi = require("joi");

var schemaCategory = Joi.object({
    nameCategory: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Name category should not be empty";
                        break;
                    case "string.min":
                        err.message = `Name category should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Name category should have at most ${err.local.limit} characters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    description: Joi.string()
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Description product should not be empty";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaCategory };
