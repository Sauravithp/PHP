const express = require("express");
const Router = express.Router();
require("dotenv").config();
const seriesRoute = require("./seriesRoute");
const userRoute = require("./UserRoute");

Router.use(process.env.SERIES_URL ,seriesRoute);
Router.use(process.env.USERS_URL,userRoute);

module.exports = Router;