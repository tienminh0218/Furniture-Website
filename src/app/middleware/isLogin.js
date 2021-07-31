var jwt = require("jsonwebtoken");
const Account = require("../models/Account");

function checkLogin(req, res, next) {
    var cookie = req.cookies;
    /// check is cookie exist
    if (Object.keys(cookie).length == 0) return res.redirect("/");

    /// verify token in cookies
    try {
        var secret = process.env.SECRECT;
        var decoded = jwt.verify(cookie.token, secret);
    } catch (error) {
        return res.send(error);
    }
    Account.findById({ _id: decoded.id_user }).then((user) => {
        if (user != null) {
            req.user = user;
            return next();
        }
    });
}

module.exports = checkLogin;
