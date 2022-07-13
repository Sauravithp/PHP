const bcrypt = require("bcrypt");

const generateHash = function (salt, password) {
    return bcrypt.hash(password, salt);
}

module.exports={
    generateHash
}