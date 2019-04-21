const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Place = require('../models/PlaceModel');
const ObjectId=require('mongodb').ObjectID;

router.post('/login', (req, res) => {
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

module.exports = router;