const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Place = require('../models/PlaceModel');

router.post('/schedule', (req, res) => {
    res.status(200).json(req.body);
    // Place.save(req.body)
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         res.status(401).json(err)
    //     });
});

router.get('/schedule')

module.exports = router;