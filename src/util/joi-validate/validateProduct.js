const Joi = require("joi");

/// Schema product insert form
var schemaInsertProduct = Joi.object({
    nameProduct: Joi.string()
        .min(6)
        .max(100)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Name product should not be empty";
                        break;
                    case "string.min":
                        err.message = `Name product should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Name product should have at most ${err.local.limit} characters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    priceProduct: Joi.string()
        .pattern(/^[A-Z0-9-]/)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Price product should not be empty";
                        break;
                    case "string.pattern.base":
                        err.message = "Price product should be a number";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    descriptionProduct: Joi.string()
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
    inventoryProduct: Joi.string()
        .pattern(/^[A-Z0-9-]/)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Inventory product should not be empty";
                        break;
                    case "string.pattern.base":
                        err.message = "Inventory product should be a number";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

/// Schema product update form
var schemaUpdateProduct = Joi.object({
    nameProduct: Joi.string()
        .min(6)
        .max(100)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Name product should not be empty";
                        break;
                    case "string.min":
                        err.message = `Name product should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Name product should have at most ${err.local.limit} characters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    priceProduct: Joi.string()
        .pattern(/^[0-9]*$/)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Price product should not be empty";
                        break;
                    case "string.pattern.base":
                        err.message = "Price product should be a number";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    inventoryProduct: Joi.string()
        .pattern(/^[0-9]*$/)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Inventory product should not be empty";
                        break;
                    case "string.pattern.base":
                        err.message = "Inventory product should be a number";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaInsertProduct, schemaUpdateProduct };
