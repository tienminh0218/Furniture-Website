const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Product = new Schema(
    {
        nameProduct: { type: String },
        nameCategory: { type: String },
        priceProduct: { type: Number },
        descriptionProduct: { type: String },
        imageProduct: { type: String },
        statusProduct: { type: String },
        inventoryProduct: { type: String },
        slug: { type: String, slug: "nameProduct" },
    },
    {
        timestamps: true,
    }
);

/// add plugin
mongoose.plugin(slug);
// Course.plugin(mongooseDelete,{
//     overrideMethods: 'all',
//     deletedAt : true,
// })

module.exports = mongoose.model("product", Product);
