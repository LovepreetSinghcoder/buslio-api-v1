const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://buslio-api-v1-default-rtdb.firebaseio.com/"
});

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send('Unauthorized');

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
}
const busesRouter = require('./routes/buses');
const usersRouter = require('./routes/users');
const routesRouter = require('./routes/routes');


app.use('/api/buses', busesRouter);
app.use('/api/users', verifyToken, usersRouter);
// app.use('/api/routes', verifyToken, routesRouter);
app.use('/api/routes', routesRouter);  // No verifyToken for public access to routes



