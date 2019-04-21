const mongoose = require('mongoose');
<<<<<<< HEAD
const cfg = require("../config/config");
=======
const cfg = require("../config/config")
>>>>>>> 127472db1caa5ce06ccd56198cfb8c002160ad53


const dbname = cfg.dbname;
const username = cfg.username;
const password = cfg.password;

const uri = `mongodb+srv://${username}:${password}@mwacluster-mdjim.mongodb.net/${dbname}?retryWrites=true`;

function dbConnection() {
    return function (req, res, next) {
        mongoose.connect(uri, { useNewUrlParser: true });
        mongoose.connection.on('connected', function () {
            console.log("connected")
        });

        req.db = mongoose;
        next();
    };
}

module.exports = dbConnection;
