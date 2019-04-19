const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.get('/save', (req, res) => {
    let user = new User({
        firstName: "First",
        lastName: "last"
    });

    user.save(function (err, firstName) {
        if (err)
            res.status(500).send("Failed");;
        res.json(user);
    });
});

module.exports = router;