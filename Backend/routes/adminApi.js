const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Place = require('../models/PlaceModel');

router.post('/schedule', (req, res) => {
    let newSchedule = req.body;
    newSchedule.address.location = newSchedule.address.location.split(',')
    newSchedule.address.postalCode = parseInt(newSchedule.address.postalCode)
    let place = new Place(req.body);
    place.save(req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.get('/schedule')

module.exports = router;