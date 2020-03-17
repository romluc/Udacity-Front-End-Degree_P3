// Empty JS object to act as endpoint for all routes
projectData = {};

require('dotenv').config();

urlData = {
  baseUrl: process.env.BASE_URL,
  apiKey: process.env.API_KEY
};

// Express to run server and routes
const express = require('express');
const port = process.env.PORT || 3000;

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

// Send sensitive data to the front-end side
app.get('/urlData', (req, res) => {
  res.send(urlData);
});

// 2. Add a GET route that returns the projectData

// Initialize all route with a callback function
app.get('/all', getAllData);

// Callback function to complete GET '/all'
function getAllData(req, res) {
  res.send(projectData);
}

// then add a POST route that adds incoming data to projectData
// Post Route
app.post('/addData', postData);

function postData(req, res) {
  // POST route setup to add each of thes values with a key to projectData
  const { date, temperature, city, content } = req.body;

  projectData = {
    date,
    temperature,
    city,
    content
  };

  res.send(req.body);
}
