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
    Place.aggregate([
        { "$unwind": "$schedule" },
        {
            "$lookup": {
                "from": "users",
                "localField": "schedule.employeeId",
                "foreignField": "_id",
                "as": "employee"
            }
        },
        { "$unwind": "$employee" },
        {
            "$project": {
                schedule: "$schedule._id",
                employee: { $concat: ['$employee.firstName', ' ', '$employee.lastName'] },
                email: '$employee.email',
                date: '$schedule.date',
                description: '$schedule.description',
                address: { $concat: ['$placeName', ', ', '$address.street', '$address.city', ', ', '$address.state', ' ', { $toString: '$address.postalCode' }] },
                status: '$schedule.status'
            }
        }
    ]).then(docs => res.status(200).json(docs))
})

router.get('/detail/:scheduleid', (req, res) => {
    Place.findOne({ schedule: { $elemMatch: { _id: req.params.scheduleid } } })
        .then(place => {
            Place.findOne({ 'schedule._id': req.params.scheduleid }, { 'schedule.$': 1 })
                .then(schedule => {
                    place.schedule = schedule.schedule[0]
                    res.status(200).json(place)
                }).catch(err => {
                    throw err
                });
        }).catch(err => {
            throw err
        })
})

module.exports = router;