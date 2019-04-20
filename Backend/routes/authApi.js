const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.post('/login', (req, res) => {
    let loginData = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(loginData.password, salt, function (err, hash) {
            if (err)
                res.status(500).send("encryption error");
            loginData.password = hash;
        });
    });
    var token = jwt.sign(User.findOne(), key, { expiresIn: 60 * 60 });
    res.status(200).json({ success: true, token: token })
    res.json({ response: "res" });
});

module.exports = router;