const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Place = require('../models/PlaceModel');
const ObjectId = require('mongodb').ObjectID;

router.post('/schedule', (req, res) => {
    let newSchedule = req.body;
    console.log(newSchedule)
    newSchedule.address.location = newSchedule.address.location.split(',')
    newSchedule.address.postalCode = parseInt(newSchedule.address.postalCode)
    newSchedule.schedule.employeeId = newSchedule.schedule.employeeId
    let place = new Place(req.body);
    place.save(req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});
// router.post('/add', (req, res) => {
//     new Place(req.body)
//          .save()
//          .then(place=>console.log(place));
// });

router.get('/schedule/:id', (req, res) => {
    console.log('jkjlkj')
    userid = new ObjectId(req.params.id);
    console.log(userid);
    Place.find({ 'schedule.employeeId': new ObjectId(req.params.id) }
        , { schedule: 1 }).populate('schedule.employeeId')
        .then(doc => res.json(doc));

});

router.get('/schedule')

module.exports = router;