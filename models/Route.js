// const mongoose = require('mongoose');

// const routeSchema = new mongoose.Schema({
//     routeNumber: { type: String, required: true },
//     stops: [{ name: String, lat: Number, lng: Number }],
//     timetable: [{ stopName: String, arrivalTime: Date }]
// });

// module.exports = mongoose.model('Route', routeSchema);


// const mongoose = require('mongoose');

// const stopSchema = new mongoose.Schema({
//     stopName: { type: String, required: true },
//     arrivalTime: { type: String, required: true } // Time in "HH:mm" format
// });

// const routeSchema = new mongoose.Schema({
//     routeName: { type: String, required: true },
//     stops: [stopSchema], // An array of stop objects
//     duration: { type: String }, // Total route duration (e.g., "1:30" for 1 hour 30 minutes)
//     frequency: { type: String } // e.g., "30 mins" to show how often the bus repeats
// });

// module.exports = mongoose.model('Route', routeSchema);



const mongoose = require('mongoose');

// Define the stops and timings for each direction (up and down)
const stopSchema = new mongoose.Schema({
    stopName: { type: String, required: true },
    arrivalTime: { type: String, required: true } // Arrival time in "HH:mm"
});

const tripSchema = new mongoose.Schema({
    tripType: { type: String, enum: ['up', 'down'], required: true }, // "up" or "down"
    stops: [stopSchema],  // Array of stops with arrival times
    startTime: { type: String, required: true },  // e.g., "07:30"
    endTime: { type: String, required: true }     // e.g., "08:20"
});

const routeSchema = new mongoose.Schema({
    routeName: { type: String, required: true },   // Dabwali to Kalanwali by Desu Jodha
    upTrips: [tripSchema],    // All up trips (Dabwali to Kalanwali)
    downTrips: [tripSchema],  // All down trips (Kalanwali to Dabwali)
});

module.exports = mongoose.model('Route', routeSchema);
