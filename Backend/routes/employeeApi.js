const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const ObjectId = require('mongodb').ObjectID;
const Place=require('../models/PlaceModel')

router.post('/checkin', (req, res) => {
    console.log("req", req.body);
    checkin = {
        
        placeName: req.body.placeName,
        checkInDate: req.body.checkInDate,
        checkInTime: req.body.checkInTime,
        status: req.body.status
    }
    User.findOne({ _id: new ObjectId(req.body.id) }).then(user => {
        console.log("updated",req.body.scheduleid)
        user.checkin.push(checkin)
        user.save().then(
            Place.update(
                { "schedule._id": req.body.scheduleid },
                { $set: { 'schedule.$.status': true } }
            ).then(d=>{
                console.log(d);
                res.json({success:true})
            }))
        })  
    });        
    

//module.exports = router;
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
                            res.status(200).json({ success: true, message: "Employee registered succesfuly" })
                        })
                        .catch(err => {
                            res.status(400).json({ succes: false, error: err })
                        })
                });
            } else {
                res.status(409).json({ success: false, message: "Email address is already used please use other Email address!" })
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
router.get('/schedule/:id', (req, res) => {
     userid = new ObjectId(req.params.id);
    console.log(userid);
    Place.find({ schedule: { $elemMatch: {status:'false',employeeId:userid } } }
        , { schedule: 1, address: 1, location: 1, placeName: 1 }).populate('schedule.employeeId')
        .then(doc => res.json(doc)).catch(err=>res.json(err));

});

module.exports = router
