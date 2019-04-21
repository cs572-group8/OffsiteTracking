const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Place = require('../models/PlaceModel');
const ObjectId=require('mongodb').ObjectID;

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
// router.post('/add', (req, res) => {
//     new Place(req.body)
//          .save()
//          .then(place=>console.log(place));
// });

router.get('/schedule/:id', (req, res) => {
userid=new ObjectId(req.params.id);
console.log(userid);
    Place.find({'schedule.employeeId':new ObjectId(req.params.id)}
    ,{schedule:1,address:1,location:1}).populate('schedule.employeeId')
    .then(doc=>res.json(doc));
   
});

router.get('/schedule')

module.exports = router;