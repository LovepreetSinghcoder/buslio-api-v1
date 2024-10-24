const express = require('express');
const Route = require('../models/Route');
const router = express.Router();

// // Add a new route with stops and timings
// router.post('/', async (req, res) => {
//     const { routeName, stops, duration, frequency } = req.body;

//     try {
//         const newRoute = new Route({
//             routeName,
//             stops,   // Array of stops with names and timings
//             duration,
//             frequency
//         });

//         // Save route to the database
//         const savedRoute = await newRoute.save();
//         res.status(201).json(savedRoute);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error while adding route' });
//     }
// });

// // Get all routes
router.get('/', async (req, res) => {
    try {
        const routes = await Route.find(); // Fetch all routes from the database
        res.json(routes);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching routes' });
    }
});

// module.exports = router;



// const express = require('express');
// const Route = require('../models/Route');
// const router = express.Router();

// Add a new route with up and down trips
router.post('/', async (req, res) => {
    const { routeName, upTrips, downTrips } = req.body;

    try {
        // Create a new Route with both up and down trips
        const newRoute = new Route({
            routeName,
            upTrips,
            downTrips
        });

        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while adding route' });
    }
});

module.exports = router;
