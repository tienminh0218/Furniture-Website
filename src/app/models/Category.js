const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-generator");

const Categories = new Schema(
    {
        nameCategory: { type: String },
        description: { type: String },
        productchid: [
            {
                nameProduct: { type: String },
                nameCategory: { type: String },
                priceProduct: { type: Number },
                descriptionProduct: { type: String },
                statusProduct: { type: String },
                inventoryProduct: { type: String },
                imageProduct: { type: String },
                cloudinaryId_imageProduct: { type: String },
                slug: { type: String },
            },
        ],
        slug: { type: String, slug: "nameCategory", unique: true },
    },
    {
        timestamps: true,
    }
);

/// add plugin
mongoose.plugin(slug);
Categories.plugin(mongooseDelete, {
    overrideMethods: "all",
    deletedAt: true,
});

module.exports = mongoose.model("categories", Categories);
