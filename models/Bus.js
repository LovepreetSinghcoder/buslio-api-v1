// const mongoose = require('mongoose');

// const busSchema = new mongoose.Schema({
//     number: { type: String, required: true },
//     currentLocation: { lat: Number, lng: Number },
//     status: { type: String, default: 'On Time' },
//     routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
// });

// module.exports = mongoose.model('Bus', busSchema);
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    number: { type: String, required: true },
    currentLocation: { lat: Number, lng: Number },
    status: { type: String, default: 'On Time' },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    tripId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference a specific trip (up or down)
    departureTime: { type: String, required: true } // Departure time
});

module.exports = mongoose.model('Bus', busSchema);


