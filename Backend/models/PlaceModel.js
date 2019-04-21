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
        postalCode: { type: Number, required: true },
        location: [Number, Number],
    },
    schedule: [
        {
            employeeId: { type: String, required: true },
            date: {
                type: Date, required: true,
                default: Date.now()
            },
            description: { type: String, required: true }
        }
    ]
}, { collection: 'places' });
placeSchema.index({ "address.location": "2d" });
module.exports = mongoose.model('Place', placeSchema);