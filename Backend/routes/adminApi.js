const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.post('/login', (req, res) => {
});

module.exports = router;