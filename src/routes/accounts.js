const express = require("express");
const route = express.Router();
const AccountController = require("../app/controllers/AccountController.js");
const checkLogin = require("../app/middleware/isLogin");
const upload = require("../util/multer");

route.get("/profile", checkLogin, AccountController.profileUser);
route.patch("/profile", checkLogin, upload.single("imageUser"), AccountController.updateProfile);
route.post("/login", AccountController.login);
route.post("/register", AccountController.register);

module.exports = route;
