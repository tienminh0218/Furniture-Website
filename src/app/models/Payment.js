const mongoose = require("mongoose");
const schema = require("schema");
const slug = require("mongoose-slug-generator");

const Payment = new schema(
    {
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
        paymentOptions: { type: String },
        totalPrice: { type: Number },
        totalQuantity: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("payments", Payment);
