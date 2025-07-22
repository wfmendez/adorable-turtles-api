// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.set('debug', true);

const turtlesRouter = require('./routes/turtles');

const app = express();

mongoose.connect(config.mongoURI)
    .then(() => console.log('Successful MongoDB connection'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());

app.use(bodyParser.json());

app.use('/turtles', turtlesRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Adorable Turtles World');
});

const PORT = process.env.PORT || config.port;

app.listen(PORT, () => {
    console.log(`Adorable Turtles Server running on port ${PORT}`);
    console.log(`Adorable Turtles List: http://localhost:${PORT}/turtles (Local Development URL)`);
});