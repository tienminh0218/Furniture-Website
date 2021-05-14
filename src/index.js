const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const route = require("./routes");
const methodOverride = require("method-override");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });
const port = process.env.PORT;
const axios = require("axios").default;

/// number format hbs
const Handlebars = require("handlebars");
const NumeralHelper = require("handlebars.numeral");
NumeralHelper.registerHelpers(Handlebars);

// if logical hbs
Handlebars.registerHelper("ifLogic", function (v1, operator, v2, options) {
    switch (operator) {
        case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case "&&":
            return v1 && v2 ? options.fn(this) : options.inverse(this);
        case "||":
            return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

// Static File
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "public")));
app.use("/details", express.static(path.join(__dirname, "public")));
app.use("/products", express.static(path.join(__dirname, "public")));
app.use("/cart", express.static(path.join(__dirname, "public")));

// Midddleware
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Connect to database
db.connect();

// HTTP logger
// app.use(morgan("combined"));
app.use(methodOverride("_method"));

// Template engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            mutiply: (a, b) => a * b,
            formatDate: (timestamp) => {
                let day = new Date(timestamp).getDate();
                let month = new Date(timestamp).getMonth();
                let year = new Date(timestamp).getFullYear();
                return `${day}-${month + 1}-${year}`;
            },
        },
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routers
route(app, express, path);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} `);
});
