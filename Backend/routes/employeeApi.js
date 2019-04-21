const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const ObjectId=require('mongodb').ObjectID;

router.get('/save', (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        phone: req.body.phone,
        email: req.body.email, 
        type: req.body.type         
    });

    user.save(function (err, firstName) {
        if (err)
            res.status(500).send("Failed");;
        res.json(user);
    });
});

  router.post('/checkin',(req,res)=>{
        console.log("req",req.body);
        checkin={
            placeName: req.body.placeName,
            checkInDate: req.body.checkInDate,
            checkInTime: req.body.checkInTime,
            status: req.body.status
        }
        User.findOne({_id:new ObjectId(req.body.id)}).then(user=>{
            user.checkin.push(checkin)
           user.save().then(user=>{res.json(checkin)})
        })
          
        })
  
module.exports = router;
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

module.exports = router
