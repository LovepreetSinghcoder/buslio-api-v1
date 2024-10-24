const express = require('express');
const Bus = require('../models/Bus');
const Route = require('../models/Route');
const router = express.Router();

// Get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find().populate('routeId');
        res.json(buses);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific bus by number
router.get('/:busNumber', async (req, res) => {
    try {
        const bus = await Bus.findOne({ number: req.params.busNumber }).populate('routeId');
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Real-time location updates (POST endpoint to update current bus location)
router.post('/:busNumber/location', async (req, res) => {
    try {
        const { lat, lng } = req.body;
        const bus = await Bus.findOneAndUpdate(
            { number: req.params.busNumber },
            { currentLocation: { lat, lng } },
            { new: true }
        );
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new bus with a route
router.post('/', async (req, res) => {
    const { number, currentLocation, status, routeId, departureTime } = req.body;

    try {
        // Create a new bus instance with a routeId reference
        const newBus = new Bus({
            number,
            currentLocation,
            status,
            routeId,
            departureTime
        });

        // Save the bus to the database
        const savedBus = await newBus.save();
        res.status(201).json(savedBus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while adding bus' });
    }
});


module.exports = router;
