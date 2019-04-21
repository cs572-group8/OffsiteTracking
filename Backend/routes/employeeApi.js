const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.post('/save', (req, res) => {
    const newUser = new User(req.body);
    newUser.password = '123';
    newUser.save((err) => {
        if (err) throw err;
        res.json({
            success: "Inserted New employee to database"
        })
    });
});

module.exports = router;