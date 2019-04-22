const express = require("express");
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const router = express.Router();

router.all('*/', (req, res, next) => {
    jwt.verify(req.headers['authorization'], config.key, function (err, decoded) {
        if (err) {
            return res.status(401).send({ succes: false, message: err })
        }
        decoded = jwt.decode(req.headers['authorization'], config.key)
        if (decoded.type !== 'admin' && req._parsedUrl.href.indexOf(decoded.type) === -1) {
            return res.status(401).json({
                succes: false,
                message: "You don't have a premission to acces."
            })
        }

        next();
    });
});

module.exports = router;