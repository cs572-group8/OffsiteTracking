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
        if (err) throw err;
        if (isMatch) {
          return res.json(
            jwt.sign(
              {
                email: user.email,
                fullName: user.firstName + " " + user.lastName,
                _id: user._id,
                type: user.type
              },
              cfg.key,
              { expiresIn: '3000' }
            )
          );

        }
        else {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' })
        }
      })

    }
  });
})

module.exports = router;