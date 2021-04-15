const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Categorys = new Schema(
    {
        nameCategory: { type: String },
        productChild: { type: Array },
        description: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("categorys", Categorys);
