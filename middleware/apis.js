const express = require('express');
const NumberModel = require('../schema/user-schema.js'); // Import the model
const UserDetailModel = require('../models/userDetailModel.js');

const router = express.Router();
const { v4: uuidv4 } = require('uuid'); 

router.post('/api/login', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        // Check if number is provided
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Number required' });
        }

        // Validate that the number is 10 digits
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ message: 'Number must be 10 digits' });
        }

        // Check if the number is already stored
        let existingNumber = await NumberModel.findOne({ phoneNumber });

        if (!existingNumber) {
            // Create a unique ID and store the number if not already present
            const newId = uuidv4();
            const newNumber = new NumberModel({ phoneNumber, id: newId });
            await newNumber.save();

            // Return success message with the generated ID
            return res.json({ message: 'Success', id: newId });
        }

        // If the number already exists, return the existing ID
        return res.status(200).json({ message: 'Number already exists', id: existingNumber.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/api/welcome/userdetails', async (req, res) => {
    const { id, firstName, lastName } = req.body;

    // Validate inputs
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'Both first name and last name are required' });
    }

    // Find the existing number by ID
    const existingNumber = await NumberModel.findOne({ id });
    if (!existingNumber) {
        return res.status(404).json({ message: 'Number not found for the given ID' });
    }

    // Create a new user entry with first name and last name
    const newUser = new UserDetailModel({ id, firstName, lastName });
    await newUser.save();

    // Return success message
    return res.json({ message: 'Names stored successfully',phoneNumber: existingNumber.phoneNumber });
});

router.get('/api/welcome/userdetails/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        // Find user details by ID
        const userDetails = await UserDetailModel.findOne({ id });
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found for the given ID' });
        }

        // Find phone number by ID
        const numberDetails = await NumberModel.findOne({ id });
        if (!numberDetails) {
            return res.status(404).json({ message: 'Phone number not found for the given ID' });
        }

        // Return the details
        return res.json({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            phoneNumber: numberDetails.phoneNumber
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: 'Server error' });
    }
});



const vechicleList = [
    "Bike",
    "Car",
    "Bicycle",
    "Auto Rickshaw"
   
];

// GET endpoint to retrieve the list of text
router.get('/api/vechicleList', (req, res) => {
    res.json({ data: vechicleList });
});




module.exports = router;
