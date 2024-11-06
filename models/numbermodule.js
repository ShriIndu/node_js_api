const mongoose = require('mongoose');

// Define NumberModel schema for phone numbers
const numberSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    id: { type: String, required: true }
});

const NumberModel = mongoose.model('Number', numberSchema);

module.exports = NumberModel;
