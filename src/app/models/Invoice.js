const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Invoice = new Schema(
    {
        customer: {
            username: { type: String },
            fullname: { type: String },
            emailaddress: { type: String },
            phonenumber: { type: Number },
            gender: { type: String },
            address: { type: String },
        },
        bills: [
            {
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
                paymentOptions: { type: String, default: "COD" },
                description: { type: String },
                totalPrice: { type: Number },
                totalQuantity: { type: Number },
                time: { type: Date, default: Date.now },
                status: { type: Boolean, default: false },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("invoices", Invoice);
