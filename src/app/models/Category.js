const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-generator");

const Categories = new Schema(
    {
        nameCategory: { type: String },
        description: { type: String },
        slug: { type: String, slug: "nameCategory" },
    },
    {
        timestamps: true,
    }
);

/// add plugin
mongoose.plugin(slug);

module.exports = mongoose.model("categories", Categories);
