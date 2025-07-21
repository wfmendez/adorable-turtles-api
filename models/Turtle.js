const mongoose = require('mongoose');

const turtleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true      
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: false, 
        min: 0         
    },
    habitat: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    image_url: {
        type: String,
        required: false,
        trim: true
    },
    threat_status: {
        type: String,
        required: false,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

turtleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Turtle', turtleSchema);