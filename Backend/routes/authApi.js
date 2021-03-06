const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const cfg = require("../config/config")

router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) res.status(500).json({ success: false, message: "Error", error: err });
        if (isMatch) {
          token = jwt.sign({
            email: user.email,
            fullName: user.firstName + " " + user.lastName,
            _id: user._id,
            type: user.type
          }, cfg.key, { expiresIn: 60 * 60 }
          );
          return res.json({
            name: `${user.firstName} ${user.lastName}`,
            userType: user.type,
            email: user.email,
            token: token
          });
        } else {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' })
        }
      })

    }
  });
})

module.exports = router;