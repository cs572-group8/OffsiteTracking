const express = require("express");
const jwt = require('jsonwebtoken');
const config = require('../config/config');
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