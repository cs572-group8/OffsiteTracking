const express = require("express");
const router = express.Router();
const axios = require("axios");
const cfg = require('../config/config')

const googleapi = "https://maps.googleapis.com/maps/api"

router.get('/geocode/:latlng', (req, res) => {
    latlng = req.params['latlng'];
    let url = `${googleapi}/geocode/json?latlng=${latlng}&key=${cfg.geocodeKey}`;
    axios.get(url)
        .then(result => {
            let locationInfo = result.data
            let info = {}
            const formatted_address = locationInfo.results[0].formatted_address.split(',')
            info.street = formatted_address[0]
            info.city = formatted_address[1]
            let statePostal = formatted_address[2].trim().split(" ")
            if (statePostal.length = 2) {
                info.state = statePostal[0]
                info.postalCode = statePostal[1]
            }
            info.country = formatted_address[3];

            res.status(200).json(info)
        })
        .catch(error => { throw error })
})


router.get('/distance/:origins/:destinations', (req, res) => {
    origins = req.params['origins'];
    destinations = req.params['destinations'];
    let url = `${googleapi}/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${cfg.directionKey}`;
    console.log(url)
    axios.get(url)
        .then(result => {
            console.log(result.data)
            res.status(200).json(result.data)
        })
        .catch(error => { throw error })
})
module.exports = router