const express = require("express");
const Router = express.Router();
require("dotenv").config();
const userController = require("../controllers/userController");

Router.route(process.env.FORWARD_SLASH)
    .post(userController.saveUser);

Router.route(process.env.LOGIN_URL)
    .post(userController.login);

module.exports = Router;