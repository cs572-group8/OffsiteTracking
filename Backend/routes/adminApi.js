const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Place = require('../models/PlaceModel');
<<<<<<< HEAD
const ObjectId=require('mongodb').ObjectID;
=======
>>>>>>> 127472db1caa5ce06ccd56198cfb8c002160ad53

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
// router.post('/add', (req, res) => {
//     new Place(req.body)
//          .save()
//          .then(place=>console.log(place));
// });

router.get('/schedule/:id', (req, res) => {
    console.log('jkjlkj')
userid=new ObjectId(req.params.id);
console.log(userid);
    Place.find({'schedule.employeeId':new ObjectId(req.params.id)}
    ,{schedule:1}).populate('schedule.employeeId')
    .then(doc=>res.json(doc));
   
});

router.get('/schedule')

module.exports = router;