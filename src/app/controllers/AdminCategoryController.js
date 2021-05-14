var Categories = require("../models/Category");
var Product = require("../models/Product");
var { multipleToObject, toObject } = require("../../util/toObj");

/// schema validate
const Joi = require("joi");
const joiSchemaCategory = require("../../util/joi-validate/validateCategory");

class AdminCategoryController {
    /// GET -> /admin/category
    category(req, res, next) {
        Categories.find({}).then((categories) => {
            res.render("admin-body/admin-category", {
                layout: "admin",
                categories: multipleToObject(categories),
            });
        });
    }

    /// GET -> /admin/category/insert
    categoryAdd(req, res, next) {
        res.render("admin-body/admin-categoryInsert", { layout: "admin" });
    }

    /// GET -> /admin/category/update
    categoryUpdateView(req, res, next) {
        Categories.find({ _id: req.query.id }).then((category) => {
            res.render("admin-body/admin-categoryUpdate", {
                layout: "admin",
                category: multipleToObject(category),
            });
        });
    }

    /// PUT -> /admin/category/update
    async categoryUpdate(req, res, next) {
        /// Validate form Category update
        const checked = await joiSchemaCategory.schemaCategory.validate(
            {
                nameCategory: req.body.nameCategory,
                description: req.body.description,
            },
            { abortEarly: false }
        );
        var { error } = checked;

        if (error) {
            res.status(409).json({ message: error.details });
            return;
        }

        // check name category is exists
        var [checkNameCategory, oldCategory] = await Promise.all([
            Categories.findOne({ nameCategory: req.body.nameCategory }),
            Categories.findOne({ _id: req.body.id }),
        ]);
        if (checkNameCategory && !(oldCategory.nameCategory === checkNameCategory.nameCategory)) {
            return res.status(409).json({ message: "Name category had exists" });
        }

        /// save
        Categories.findOneAndUpdate(
            { _id: req.body.id },
            {
                nameCategory: req.body.nameCategory,
                description: req.body.description,
            },
            {
                new: true,
            }
        ).then((newCategory) => {
            res.status(200).json({ message: "Updated successfully" });
        });
    }

    /// POST -> /admin/category/insert
    async categoryInsert(req, res, next) {
        // if nameCategory is exist
        var nameCategoryCheck = await Categories.findOne({
            nameCategory: req.body.nameCategory,
        });
        if (nameCategoryCheck) {
            res.status(400).json({
                message: "Name category has already exists",
            });
            return;
        }

        /// Validate form product insert
        const checked = await joiSchemaCategory.schemaCategory.validate(
            {
                nameCategory: req.body.nameCategory,
                description: req.body.description,
            },
            { abortEarly: false }
        );
        var { error } = checked;

        if (error) {
            res.status(409).json({ message: error.details });
            return;
        }

        var newCategory = new Categories(req.body);
        newCategory
            .save()
            .then(() => {
                res.status(201).json({
                    message: "Created category successfully",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // GET -> /admin/category/bin
    categoryBin(req, res, next) {
        Categories.findDeleted({}).then((categoryDeleted) => {
            res.render("admin-body/admin-categoryBin", {
                layout: "admin",
                categoryDeleted: multipleToObject(categoryDeleted),
            });
        });
    }

    // PATCH -> /admin/category/:id
    categoryBinRestore(req, res, next) {
        var newArr = req.params.id.split(",");
        Categories.restore({
            _id: { $in: newArr },
        }).then(() => {
            res.redirect("back");
        });
    }

    // DELETE -> /admin/category/:id
    categoryDelete(req, res, next) {
        var newArr = req.params.id.split(",");
        Categories.delete({
            _id: { $in: newArr },
        }).then(() => {
            res.redirect("back");
        });
    }
}

module.exports = new AdminCategoryController();
