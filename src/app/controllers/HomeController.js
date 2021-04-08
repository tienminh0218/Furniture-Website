const Account = require("../models/Account");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { toObject } = require("../../util/toObj");

class HomeController {
    islogin(req, res, next) {
        var cookie = req.cookies;
        /// check is cookie exist
        if (Object.keys(cookie).length == 0)
            return res.render("home", {
                user: false,
            });
        /// verify token in cookie
        try {
            var secret = process.env.SECRECT;
            var decoded = jwt.verify(cookie.token, secret);
        } catch (error) {
            return res.send(error);
        }
        Account.findById({ _id: decoded.id_user }).then((user) => {
            res.render("home", { user: toObject(user) });
        });
    }
}

module.exports = new HomeController();
