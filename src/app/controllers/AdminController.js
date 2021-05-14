var Categories = require("../models/Category");
var Product = require("../models/Product");
var { multipleToObject, toObject } = require("../../util/toObj");

/// schema validate
const joiSchemaProduct = require("../../util/joi-validate/validateProduct");
const joiSchemaCategory = require("../../util/joi-validate/validateCategory");
const Joi = require("joi");

/// upload file
const cloudinary = require("../../util/cloudinary");
const upload = require("../../util/multer");
class AdminController {
    /// GET -> /admin/
    home(req, res, next) {
        res.render("admin-body/admin-home", { layout: "admin" });
    }
}

module.exports = new AdminController();
