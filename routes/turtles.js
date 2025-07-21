const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let adorableTurtles = [
    {
        "id": "1",
        "name": "Shelly",
        "species": "Green Sea Turtle",
        "age": 15,
        "habitat": "Pacific Ocean",
        "description": "Shelly is a very friendly green sea turtle, known for her vibrant shell color.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/da/Green_sea_turtle_feeding.jpg",
        "threat_status": "Endangered"
    },
    {
        "id": "2",
        "name": "Crush",
        "species": "Loggerhead Sea Turtle",
        "age": 50,
        "habitat": "Atlantic Ocean",
        "description": "Crush is a wise and calm loggerhead sea turtle, always ready to give good advice.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Loggerhead_sea_turtle_%28Caretta_caretta%29.jpg",
        "threat_status": "Vulnerable"
    }
];

router.get('/', (req, res) => {
    console.log('GET /turtles requested');
    res.json(adorableTurtles);
});

router.get('/:id', (req, res) => {
    const requestedId = req.params.id;
    console.log(`GET /turtles/${requestedId} requested`);
    const turtle = adorableTurtles.find(t => t.id === requestedId);

    if (turtle) {
        res.json(turtle);
    } else {
        
        res.status(404).json({ message: 'Turtle not found' });
    }
});

router.post('/', (req, res) => {
    console.log('POST /turtles requested');
    const newTurtleData = req.body;

    if (!newTurtleData.name || !newTurtleData.species) {
        return res.status(400).json({ message: 'Name and species are required fields.' });
    }

    const newTurtle = {
        id: uuidv4(), 
        ...newTurtleData 
    };

    adorableTurtles.push(newTurtle); 
    res.status(201).json(newTurtle); 
});

router.put('/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const updatedData = req.body;
    console.log(`PUT /turtles/${idToUpdate} requested`);

    const turtleIndex = adorableTurtles.findIndex(t => t.id === idToUpdate);

    if (turtleIndex !== -1) {
        const updatedTurtle = { id: idToUpdate, ...updatedData };
        adorableTurtles[turtleIndex] = updatedTurtle;
        res.json(updatedTurtle);
    } else {
        res.status(404).json({ message: 'Turtle not found for update.' });
    }
});

router.patch('/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const partialData = req.body;
    console.log(`PATCH /turtles/${idToUpdate} requested`);

    const turtleIndex = adorableTurtles.findIndex(t => t.id === idToUpdate);

    if (turtleIndex !== -1) {
        adorableTurtles[turtleIndex] = {
            ...adorableTurtles[turtleIndex],
            ...partialData 
        };
        res.json(adorableTurtles[turtleIndex]);
    } else {
        res.status(404).json({ message: 'Turtle not found for partial update.' });
    }
});

router.delete('/:id', (req, res) => {
    const idToDelete = req.params.id;
    console.log(`DELETE /turtles/${idToDelete} requested`);

    const initialLength = adorableTurtles.length;
    adorableTurtles = adorableTurtles.filter(t => t.id !== idToDelete);

    if (adorableTurtles.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Turtle not found for deletion.' });
    }
});

module.exports = router;