const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const db = require("./config/db");
const route = require("./routes");
const methodOverride = require("method-override");
app.use(express.static(path.join(__dirname, "public")));

// Midddleware
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Connect to database
db.connect();

// HTTP logger
// app.use(morgan('combined'));
app.use(methodOverride("_method"));

// Template engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routers
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
