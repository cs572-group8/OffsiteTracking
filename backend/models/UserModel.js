const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    test: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    employmentDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    checkin: [
        {
            placeId: Number,
            checkInDate: Date,
            checkInTime: String,
            status: String
        }
    ]
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);