const mongoose = require('mongoose');
const cfg = require("../config/config")
<<<<<<< HEAD

=======
>>>>>>> 8cd0344bc440f9e8686584cc3dad993a07271fe5

const dbname = cfg.dbname;
const username = cfg.username;
const password = cfg.password;

const uri = `mongodb+srv://${username}:${password}@mwacluster-mdjim.mongodb.net/${dbname}?retryWrites=true`;

function dbConnection() {
    return function (req, res, next) {
        mongoose.connect(uri, { useNewUrlParser: true });
        req.db = mongoose;
        next();
    };
}

module.exports = dbConnection;
