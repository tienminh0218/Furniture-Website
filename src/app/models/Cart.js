const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const Cart = new Schema({
    cartId: {
        type: [Number],
        default: function () {
            return Math.random();
        },
    },
    account: [
        {
            username: { type: String },
            password: { type: String },
            fullname: { type: String },
            phonenumber: { type: Number },
            gender: { type: String },
            address: { type: String },
        },
    ],
    productChild: [
        {
            nameProduct: { type: String },
            priceProduct: { type: Number },
            descriptionProduct: { type: String },
            statusProduct: { type: String },
            inventoryProduct: { type: String },
            imageProduct: { type: String },
            cloudinaryId_imageProduct: { type: String },
            slug: { type: String },
        },
    ],
    totalPrice: { type: Number },
    slug: { type: String, slug: "cartId", unique: true },
});
module.exports = mongoose.model("cart", Cart);
