const express = require('express');
const router = express.Router();
const Turtle = require('../models/Turtle');

router.get('/', async (req, res) => {
    console.log('GET /turtles requested');
    try {
        const turtles = await Turtle.find();
        res.json(turtles);
    } catch (err) {
        console.error('Error fetching turtles:', err);
        res.status(500).json({ message: 'Internal server error while fetching turtles.' });
    }
});

router.get('/:id', async (req, res) => {
    const requestedId = req.params.id;
    console.log(`GET /turtles/${requestedId} requested`);
    try {
        const turtle = await Turtle.findById(requestedId);

        if (turtle) {
            res.json(turtle);
        } else {
            res.status(404).json({ message: 'Turtle not found' });
        }
    } catch (err) {
        console.error(`Error fetching turtle ${requestedId}:`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        res.status(500).json({ message: 'Internal server error while fetching the turtle.' });
    }
});

router.post('/', async (req, res) => {
    console.log('POST /turtles requested');
    const newTurtleData = req.body;

    if (!newTurtleData.name || !newTurtleData.species) {
        return res.status(400).json({ message: 'Name and species are required fields.' });
    }

    try {
        const newTurtle = new Turtle(newTurtleData);
        const savedTurtle = await newTurtle.save();
        res.status(201).json(savedTurtle);
    } catch (err) {
        console.error('Error creating turtle:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error while creating turtle.' });
    }
});

router.put('/:id', async (req, res) => {
    const idToUpdate = req.params.id;
    const updatedData = req.body;
    console.log(`PUT /turtles/${idToUpdate} requested`);

    try {
        const updatedTurtle = await Turtle.findByIdAndUpdate(
            idToUpdate,
            updatedData,
            { new: true, runValidators: true }
        );

        if (updatedTurtle) {
            res.json(updatedTurtle);
        } else {
            res.status(404).json({ message: 'Turtle not found for update.' });
        }
    } catch (err) {
        console.error(`Error updating turtle ${idToUpdate}:`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error while updating the turtle.' });
    }
});

router.patch('/:id', async (req, res) => {
    const idToUpdate = req.params.id;
    const partialData = req.body;
    console.log(`PATCH /turtles/${idToUpdate} requested`);

    try {
        const updatedTurtle = await Turtle.findByIdAndUpdate(
            idToUpdate,
            { $set: partialData },
            { new: true, runValidators: true }
        );

        if (updatedTurtle) {
            res.json(updatedTurtle);
        } else {
            res.status(404).json({ message: 'Turtle not found for partial update.' });
        }
    } catch (err) {
        console.error(`Error partially updating turtle ${idToUpdate}:`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error while partially updating the turtle.' });
    }
});

router.delete('/:id', async (req, res) => {
    const idToDelete = req.params.id;
    console.log(`DELETE /turtles/${idToDelete} requested`);

    try {
        const deletedTurtle = await Turtle.findByIdAndDelete(idToDelete);

        if (deletedTurtle) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Turtle not found for deletion.' });
        }
    } catch (err) {
        console.error(`Error deleting turtle ${idToDelete}:`, err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        res.status(500).json({ message: 'Internal server error while deleting the turtle.' });
    }
});

module.exports = router;