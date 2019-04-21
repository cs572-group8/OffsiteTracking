const express = require("express");
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const authConfig = require('../config/config')

=======
const config = require('../config/config');
>>>>>>> 127472db1caa5ce06ccd56198cfb8c002160ad53
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