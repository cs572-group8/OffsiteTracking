const express = require("express");
const router = express.Router();
const Place = require('../models/PlaceModel');
const ObjectId = require('mongodb').ObjectID;

router.post('/schedule', (req, res) => {
    let newSchedule = req.body;
    newSchedule.address.location = newSchedule.address.location.split(',')
    newSchedule.address.postalCode = parseInt(newSchedule.address.postalCode)
    newSchedule.schedule.employeeId = newSchedule.schedule.employeeId

    Place.findOne({
        'placeName': newSchedule.placeName,
        'address.state': newSchedule.address.state,
        'address.city': newSchedule.address.city,
        'address.street': newSchedule.address.street,
        'address.postalCode': newSchedule.address.postalCode,
        'address.location': newSchedule.address.location
    }, (err, doc) => {
        if (err) throw err
        if (doc) {
            doc.schedule.push(req.body.schedule)
            doc.save().then(
                doc => {
                    res.status(200).json({ success: true, message: "Schedule is registred." })
                }).catch(
                    err => {
                        res.status(401).json({ success: false, message: "Schedule is registred." })
                    }
                )
        } else {
            let place = new Place(req.body);
            place.save(req.body)
                .then(data => {
                    res.status(200).json({ success: true, message: "Schedule is registred." })
                })
                .catch(err => {
                    res.status(500).json(err)
                });
        }
    });
});

router.get('/schedule/:id', (req, res) => {
    userid = new ObjectId(req.params.id);
    console.log(userid);
    Place.find({ 'schedule.employeeId': new ObjectId(req.params.id) }
        , { schedule: 1, address: 1, location: 1, placeName: 1 }).populate('schedule.employeeId')
        .then(doc => res.json(doc));

});

router.get('/schedules', (req, res) => {
    // Place.find({}, { schedule: 1 })
    //     .populate('schedule.employeeId')
    //     .then(d => console.log(d[0].schedule))
    result = Place.aggregate(
        [{
            $unwind: "$schedule"
        }]
    )
        .project(
            {
                _id: 0,
                address: { $concat: ['$placeName', ', ', '$address.street', '$address.city', ', ', '$address.state', ' ', { $toString: '$address.postalCode' }] },
                schedule: 1
            }
        ).exec().then(docs => res.status(200).json(docs))
        .catch(err => { throw err })

    // result.then(result => {
    //     Place
    //         .populate(result, { path: 'schedule.employeeId' })
    //         .then(docs => res.status(200).json(docs))
    //         .catch(err => { throw err })
    // })
})

module.exports = router;