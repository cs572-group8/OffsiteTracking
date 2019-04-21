const express = require("express");
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const authConfig = require('../config/config')

=======
const config = require('../config/config');
>>>>>>> 8cd0344bc440f9e8686584cc3dad993a07271fe5
const router = express.Router();

router.all('/', (req, res, next) => {
    //var hash = bcrypt.hashSync("password", 10);
    //bcrypt.compareSync(myPlaintextPassword, hash);

    jwt.verify(req.headers['authorization'], config.key, function (err, decoded) {
        if (err)
            res.status(401).send(err)
    });
    next();
});

module.exports = router;