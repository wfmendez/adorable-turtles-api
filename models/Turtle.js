// models/Turtle.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Sub-schema for geographical coordinates
const geoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true }
}, { _id: false }); // _id: false to prevent Mongoose from creating an _id for this subdocument

// Sub-schema for location
const locationSchema = new mongoose.Schema({
  residence: { type: String, trim: true, required: true }, // E.g., "Crystal Caverns", "Sunken City"
  realm: { type: String, trim: true, required: false },    // E.g., "Aqua-Terrania", "Whispering Woods"
  coordinates: { type: geoSchema, required: false }        // Lat/Lng for their "home" location
}, { _id: false });

// Sub-schema for affiliation (similar to 'company' in your example)
const affiliationSchema = new mongoose.Schema({
  groupName: { type: String, trim: true, required: false }, // E.g., "Shell Guardians", "Order of the Ancient Sages"
  role: { type: String, trim: true, required: false },      // E.g., "Leader", "Scout", "Archivist"
  motto: { type: String, trim: true, required: false }      // E.g., "Shells United, Worlds Protected"
}, { _id: false });

// Main Turtle Schema
const turtleSchema = new mongoose.Schema({
  // Basic Identification
  turtleId: { type: Number, unique: true },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true // Ensures no two turtles have the exact same name
  },
  nickname: { type: String, trim: true, required: false }, // Nickname

  // Fantasy/Humanoid Characteristics
  species: {
    type: String,
    required: true,
    trim: true,
    enum: ['Sea Turtle', 'Land Turtle', 'Mystic Turtle', 'Elemental Turtle', 'Forest Turtle', 'Desert Turtle', 'Sky Turtle', 'Lava Turtle'] // Added more for fun!
  },
  ageYears: { // Renamed from 'age' for clarity
    type: Number,
    required: false,
    min: 0,
    max: 1000 // They could live long in fantasy!
  },
  personalityTraits: [{ // Array of strings for personality traits
    type: String,
    trim: true
  }], // E.g., ["Brave", "Curious", "Wise", "Playful"]
  specialAbility: { type: String, trim: true, required: false }, // E.g., "Telekinesis", "Water Breathing", "Camouflage"
  description: { type: String, trim: true, required: false },

  // Appearance
  shellColor: { type: String, trim: true, required: false },
  eyeColor: { type: String, trim: true, required: false },
  image_url: { type: String, trim: true, required: false }, // URL for an image

  // Location and "Life"
  currentLocation: { type: locationSchema, required: false }, // Their current/home location

  // Affiliation (similar to 'company' in your example)
  affiliation: { type: affiliationSchema, required: false },

  // Contact (if they have a formal way to "communicate")
  preferredCommunication: { type: String, trim: true, required: false }, // E.g., "Telepathy", "Whispers", "Ancient Scrolls"

  // Timestamp fields (to know when the document was created/updated)
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Apply the auto-increment plugin to the turtleSchema
turtleSchema.plugin(AutoIncrement, { inc_field: 'turtleId' });

// Middleware to update 'updatedAt' before saving
turtleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Turtle Model
module.exports = mongoose.model('Turtle', turtleSchema);