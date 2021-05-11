const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Account = new Schema(
    {
        username: { type: String },
        password: { type: String },
        fullname: { type: String },
        phonenumber: { type: Number },
        emailaddress: { type: String },
        gender: { type: String },
        address: { type: String },
        role: { type: String },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("accounts", Account);
