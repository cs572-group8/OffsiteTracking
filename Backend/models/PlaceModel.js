const mongoose = require('mongoose');
const Schema = mongoose.Schema
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
            employeeId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date, required: true,
                default: Date.now()
            },
            description: { type: String, required: true },
            status: { type: Boolean }
        }
    ]


}, { collection: 'places' });
placeSchema.index({ "address.location": "2d" });
module.exports = mongoose.model('Place', placeSchema);