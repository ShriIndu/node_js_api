const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./config/connection'); // Database connection function
const apiRoutes = require('./middleware/apis'); // Import the API routes

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDb();

// Middleware
app.use(bodyParser.json());

// Use the API routes from apis.js
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
