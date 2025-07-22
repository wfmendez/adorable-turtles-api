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
    res.json({
        message: 'Welcome to Adorable Turtles World API!',
        endpoints: {
            all_turtles: '/turtles',
            single_turtle_by_id: '/turtles/:id',
            filter_by_name: '/turtles?name={partial_name}',
            filter_by_species: '/turtles?species={species_name}',
            filter_by_realm: '/turtles?realm={realm_name}',
            filter_by_age_range: '/turtles?ageYears[gte]={min_age}&ageYears[lte]={max_age}',
            filter_by_personality_trait: '/turtles?personalityTraits={trait1},{trait2}',

        },
        documentation: 'https://github.com/wfmendez/adorable-turtles-api/tree/main',
    });
});

const PORT = process.env.PORT || config.port;

app.listen(PORT, () => {
    console.log(`Adorable Turtles Server running on port ${PORT}`);
    console.log(`Adorable Turtles List: http://localhost:${PORT}/turtles (Local Development URL)`);
});