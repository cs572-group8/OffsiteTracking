const mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    address: {
        state: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        state: { type: String, required: true },
        location: [Number, Number],
    },
    schedule: [
        {
            employeeId: { type: Number, required: true },
            date: {
                type: Date, required: true,
                default: Date.now
            },
            description: { type: String, required: true }
        }
    ]
}, { collection: 'places' });

module.exports = mongoose.model('Place', placeSchema);