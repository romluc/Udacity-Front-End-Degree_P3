// Empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');
const port = 3000;

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Start up the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
