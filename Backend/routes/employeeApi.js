const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const ObjectId = require('mongodb').ObjectID;
const Place = require('../models/PlaceModel')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cfg = require("../config/config")

const defaultPass = "employee";

router.post('/checkin', (req, res) => {
    checkin = {
        placeName: req.body.placeName,
        checkInDate: req.body.checkInDate,
        checkInTime: req.body.checkInTime,
        status: req.body.status
    }
    User.findOne({ _id: new ObjectId(req.body.id) }).then(user => {
        user.checkin.push(checkin)
        user.save().then(
            Place.update(
                { "schedule._id": req.body.scheduleid },
                { $set: { 'schedule.$.status': true } }
            ).then(d => {
                res.json({ success: true })
            }))
            .catch(err => res.status(500).json({ success: false, message: "Error", error: err }));
    })
});

router.post('/save', (req, res) => {
    User.findOne(
        { email: req.body.email },
        (err, doc) => {
            if (err) {
                console.log(err)
                res.status(500).json({ success: false, message: "Error", error: err });
            }
            if (doc == null) {
                bcrypt.hash(defaultPass, 10, function (err, hash) {
                    if (err) {
                        res.status(500).json({ success: false, message: "Error", error: err })
                    };
                    req.body.password = hash;
                    if (!req.body.type || req.body.type == '')
                        req.body.type = 'employee'
                    let user = new User(req.body);
                    user.save()
                        .then(data => {
                            res.status(200).json({ success: true, message: "Employee registered successfully" })
                        })
                        .catch(err => {
                            res.status(500).json({ succes: false, message: "Some field value is missing. Please complete fields.", error: err })
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
            if (err) res.status.json({ success: false, message: "Error", error: err });
            res.status(200).json(doc)
        })
})

router.get('/schedule/:id', (req, res) => {
    userid = new ObjectId(req.params.id);
    console.log(userid);
    Place.find({ schedule: { $elemMatch: { status: 'false', employeeId: userid } } }
        , { schedule: 1, address: 1, location: 1, placeName: 1 }).populate('schedule.employeeId')
        .then(doc => res.json(doc)).catch(err => res.json(err))
        .catch(err => res.status(500).json({ success: false, message: "Error", error: err }));
});

router.post('/update', (req, res) => {
    let data = req.body;
    if (data.password === data.verify) {
        decoded = jwt.decode(req.headers['authorization'], cfg.key)
        bcrypt.hash(data.password, 10, function (err, hash) {
            if (err) res.stat(500).json({ success: false, message: "Error", error: err });
            User.updateOne(
                { email: decoded.email },
                { $set: { password: hash } }
            ).then(
                doc => res.status(200).json({ succes: true, message: "Password updated successfully" })
            ).catch(
                err => res.status(400).json({ succes: false, message: "User not found", error: err })
            )
        });

    } else
        res.status(400).json({ succes: false, message: "Password confirm doesn't match." })
})

module.exports = router
