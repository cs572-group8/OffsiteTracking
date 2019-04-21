const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
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