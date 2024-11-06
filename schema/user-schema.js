const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Ensure phone numbers are unique
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    id: { type: String, required: true, unique: true }
});

const NumberModel = mongoose.model('Number', numberSchema);

module.exports = NumberModel;
