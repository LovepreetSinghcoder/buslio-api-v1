const express = require('express');
const User = require('../models/User');
const Route = require('../models/Route');
const router = express.Router();

// Add a favorite route for a user
router.post('/:userId/favorite', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const route = await Route.findById(req.body.routeId);
        if (!user || !route) {
            return res.status(404).json({ error: 'User or Route not found' });
        }
        user.favoriteRoutes.push(route._id);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all favorite routes for a user
router.get('/:userId/favorites', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('favoriteRoutes');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.favoriteRoutes);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
