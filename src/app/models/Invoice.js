const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Invoice = new Schema({
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
            quantity: { type: Number },
            imageProduct: { type: String },
            nameCategory: { type: String },
            slug: { type: String },
        },
    ],
    description: { type: String },
    totalPrice: { type: Number },
    totalQuantity: { type: Number },
});

module.exports = mongoose.model("invoices", Invoice);
