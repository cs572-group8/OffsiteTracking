const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.get('/save', (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        phone: req.body.phone,
        email: req.body.email, 
        type: req.body.type         
    });

    user.save(function (err, firstName) {
        if (err)
            res.status(500).send("Failed");;
        res.json(user);
    });
});

module.exports = router;