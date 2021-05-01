const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const Cart = new Schema({
    // cartId: {
    //     type: [Number],
    //     default: function () {
    //         return Math.random();
    //     },
    // },
    customer: {
        username: { type: String },
        fullname: { type: String },
        emailaddress: { type: String },
        phonenumber: { type: Number },
        gender: { type: String },
        address: { type: String },
    },
    products: [
        {
            nameProduct: { type: String },
            priceProduct: { type: Number },
            // descriptionProduct: { type: String },
            // statusProduct: { type: String },
            // inventoryProduct: { type: String },
            quantity: { type: string },
            imageProduct: { type: String },
            // cloudinaryId_imageProduct: { type: String },
            nameCategory: { type: String },
            slug: { type: String },
        },
    ],
    totalPrice: { type: Number },
    // slug: { type: String, slug: "cartId", unique: true },
});
module.exports = mongoose.model("cart", Cart);
