const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    favoriteRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }]
});

module.exports = mongoose.model('User', userSchema);
