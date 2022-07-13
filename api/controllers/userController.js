const mongoose = require("mongoose");
const USER = mongoose.model("User");
const bcryptUtil = require("../util/BcryptUtil");
const bcrypt = require("bcrypt");
require("dotenv").config();

let response = {
    status: process.env.STATUS_OK,
    message: process.env.SUCCESS
}

let saveUser = function (req, res) {
    console.log(req);
    bcrypt.genSalt(10)
        .then((salt) => bcryptUtil.generateHash(salt, req.body.password))
        .then((hashedPassword) => {
            console.log("Hashpassword: ",hashedPassword)
            _createNewUser(req, hashedPassword)
        })
        .then((user) => fillResponse(response, process.env.STATUS_OK, user))
        .catch((error) => {
            console.log(process.env.ERROR, error);
            fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                process.env.INTERNAL_SERVER_ERROR);
        })
        .finally(() => sendResponse(response, res));
}

const _createNewUser = function (req, password) {
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: password
    }

    console.log(user);

    return USER.create(user);

}

const login = function (req, res) {
    console.log("Login controller called");
    const response = {
        status: process.STATUS_OK,
        message: ''
    }

    console.log("request password",req.body.password);

    if (req.body && req.body.username && req.body.password) {
        USER.findOne({ username: req.body.username })
            .then((user) => checkPassword(user, req.body.password))
            .then((user) => fillResponse(response, process.env.STATUS_OK, user))
            .catch((err) => {
                console.log("error",err);
                fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE, err)
            } )
            .finally(() => sendResponse(response, res))
    } else {
        console.log("username and password missing");
        fillResponse(response,process.env.BAD_REQUEST_STATUS_CODE,process.env.BAD_REQUEST);
        res.status(response.status).json(response.message);
    }
}

const checkPassword = function (user, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
            .then((passwordMatched) => {
                console.log("check password",passwordMatched);
                if (passwordMatched) {
                    resolve(user);
                }
                else {
                    reject("Unauthorized");
                }
            })
    });
}


const fillResponse = function (response, status, message) {
    console.log("fill response",response);

    response.status = status;
    response.message = message;
}

const sendResponse = function (response, res) {
    console.log("send response",response);
    res.status(response.status).json(response.message);
}


module.exports = { saveUser, login }
