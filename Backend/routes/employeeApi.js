const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
var bcrypt = require('bcryptjs');

const defaultPass = "employee";
router.post('/save', (req, res) => {
    User.findOne(
        { email: req.body.email },
        (err, doc) => {
            if (err) throw err;
            if (doc == null) {
                bcrypt.hash(defaultPass, 10, function (err, hash) {
                    if (err) throw err;
                    req.body.password = hash;
                    let user = new User(req.body);
                    user.save()
                        .then(data => {
                            res.status(200).json({ success: true, message: "Employee registred succesfuly" })
                        })
                        .catch(err => {
                            res.status(400).json({ succes: false, error: err })
                        })
                });
            } else {
                res.status(409).json({ success: false, message: "Email address already used plese use other Email address." })
            }
        }
    );
});

router.get('/all', (req, res) => {
    User.find(
        {},
        { _id: 1, firstName: 1, lastName: 1 },
        function (err, doc) {
            if (err) throw err
            res.status(200).json(doc)
        })
})

module.exports = router