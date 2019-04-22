const mongoose = require('mongoose');
const cfg = require("../config/config")

const dbname = cfg.dbname;
const username = cfg.username;
const password = cfg.password;

const uri = `mongodb+srv://${username}:${password}@cluster0-fs3o9.mongodb.net/${dbname}?retryWrites=true`;

function dbConnection() {
    return function (req, res, next) {
        mongoose.connect(uri, { useNewUrlParser: true });
        req.db = mongoose;
        next();
    };
}

module.exports = dbConnection;
