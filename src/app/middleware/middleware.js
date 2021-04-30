var jwt = require("jsonwebtoken");
const Account = require("../models/Account");

function checkAdmin(req, res, next) {
    var cookie = req.cookies;
    /// check is cookie exist
    if (Object.keys(cookie).length == 0) return res.send("ai cho mày vô");

    /// verify token in cookie
    try {
        var secret = process.env.SECRECT;
        var decoded = jwt.verify(cookie.token, secret);
    } catch (error) {
        return res.send(error);
    }
    Account.findById({ _id: decoded.id_user }).then((user) => {
        if (+user.role === 2) {
            return next();
        }
        res.send("Á à lại định hack à");
    });
}

module.exports = { checkAdmin };
