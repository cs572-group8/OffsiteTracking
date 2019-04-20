const express = require("express");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/config')

const router = express.Router();
router.all('/', (req, res, next) => {
    jwt.verify(req.headers['authorization'], authConfig.key, function (err, decoded) {
        if (err)
            res.status(401).send(err)
    });
    next();
});

module.exports = router;