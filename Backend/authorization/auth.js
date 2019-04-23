const express = require("express");
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const router = express.Router();

roles = { admin: 'admin', employee: 'employee' }

const permissions = {
    employee: [roles.admin, roles.employee],
    admin: [roles.admin],
    google: [roles.admin, roles.employee]
}

router.all('*/', (req, res, next) => {
    jwt.verify(req.headers['authorization'], config.key, function (err, decoded) {
        if (err)
            return res.status(401).send({ succes: false, message: err })

        url = req._parsedUrl.href.split('/')[1]
        decoded = jwt.decode(req.headers['authorization'], config.key)
        if (!permissions[url].includes(decoded.type)) {
            return res.status(401).json({
                succes: false,
                message: "You don't have a premission to access."
            })
        }
        next();
    });
});

module.exports = router;