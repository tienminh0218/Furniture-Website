const Account = require("../models/Account");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");

const Categories = require("../models/Category");
const { multipleToObject } = require("../../util/toObj");
class HomeController {
    /// Get -> /
    async islogin(req, res, next) {
        var categories = await Categories.find({});

        var cookie = req.cookies;
        /// check is cookie exist
        if (Object.keys(cookie).length == 0)
            return res.render("home", {
                user: false,
                categories: multipleToObject(categories),
            });
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }
        Account.findById({ _id: decoded.id_user }).then((user) => {
            res.render("home", { user: toObject(user), categories: multipleToObject(categories) });
        });
    }
}

module.exports = new HomeController();
