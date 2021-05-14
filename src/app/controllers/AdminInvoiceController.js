const Categories = require("../models/Category");
const Product = require("../models/Product");
const Invoices = require("../models/Invoice");
const { multipleToObject, toObject } = require("../../util/toObj");
const escapeRegex = require("../../util/fuzzyRegex");
const mongoose = require("mongoose");
// const id = mongoose.Types.ObjectId("4edd40c86762e0fb12000003");

// mail
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./src/.env" });

// create a transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USERNAME_EMAIL || "ngtienminh0218@gmail.com",
        pass: process.env.PASSWORD_EMAIL || "nguyenminhtien999",
    },
});

// config nodemailer
transporter.use(
    "compile",
    hbs({
        // viewEngine: "express-handlebars",
        viewPath: path.resolve(__dirname, "../../resources/views"),

        viewEngine: {
            partialsDir: path.resolve(__dirname, "../../resources/views"),
            defaultLayout: false,
        },

        extName: ".hbs",
    })
);
// console.log(p);
// set mail options
let mailOptions = {
    from: "ngtienminh0218@gmail.com",
    to: "tienminh0218@gmail.com",
    subject: "Hóa đơn mua hàng FAQ Shop",
    text: "",
    template: "email",
    context: {
        name: "Accime Esterling",
    },
};

////

class AdminInvoiceController {
    /// GET -> /admin/customers
    listCustomers(req, res) {
        Invoices.find({}).then((invoices) => {
            // convert to object literal
            invoices = multipleToObject(invoices);

            // get total price and quantity of all order per user
            invoices.forEach((invoice) => {
                let userTotalPrice = 0,
                    userTotalQuantity = 0;

                invoice.bills.forEach((bill) => {
                    userTotalPrice += bill.totalPrice;
                    userTotalQuantity += bill.totalQuantity;
                });

                invoice["userTotalPrice"] = userTotalPrice;
                invoice["userTotalQuantity"] = userTotalQuantity;
            });

            res.render("admin-body/admin-listCustomer", {
                layout: "admin",
                invoices,
            });
        });
    }

    /// GET -> /admin/customer
    getCustomer(req, res) {
        Invoices.find({}).then((invoices) => {
            // convert to object literal
            invoices = multipleToObject(invoices);

            // get total price and quantity of all order per user
            invoices.forEach((invoice) => {
                let userTotalPrice = 0,
                    userTotalQuantity = 0;

                invoice.bills.forEach((bill) => {
                    userTotalPrice += bill.totalPrice;
                    userTotalQuantity += bill.totalQuantity;
                });

                invoice["userTotalPrice"] = userTotalPrice;
                invoice["userTotalQuantity"] = userTotalQuantity;
            });

            res.render("admin-body/admin-listCustomer", {
                layout: "admin",
                invoices,
            });
        });
    }

    /// GET -> /admin/customer/:username
    detailInvoice(req, res) {
        let username = req.params.username;
        Invoices.findOne({
            "customer.username": username,
        }).then((invoice) => {
            res.render("admin-body/admin-detailInvoice", {
                layout: "admin",
                invoice: toObject(invoice),
            });
        });
    }

    /// GET -> /customer/search
    searchUser(req, res) {
        /// check empty string
        if (!req.query.keyword) return res.status(200).json({ message: [] });

        let keywords = new RegExp(escapeRegex(req.query.keyword), "gi");
        Invoices.find({
            $or: [{ "customer.username": keywords }, { "customer.fullname": keywords }],
        })
            .limit(4)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /// POST /admin/customer/email/:username
    sendMail(req, res) {
        // send mail
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log(`Error: ${err}`);
            }
            return console.log("Email sent!!!");
        });
    }
}

module.exports = new AdminInvoiceController();
