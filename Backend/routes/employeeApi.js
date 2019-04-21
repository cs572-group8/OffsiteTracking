const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.post('/save', (req, res) => {
    console.log(req.body);
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

    user.save(user)
});

module.exports = router