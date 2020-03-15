// Empty JS object to act as endpoint for all routes
projectData = {
  // coord: {
  //   lon: -0.13,
  //   lat: 51.51
  // },
  // weather: [
  //   {
  //     id: 300,
  //     main: 'Drizzle',
  //     description: 'light intensity drizzle',
  //     icon: '09d'
  //   }
  // ],
  // base: 'stations',
  // main: {
  //   temp: 280.32,
  //   pressure: 1012,
  //   humidity: 81,
  //   temp_min: 279.15,
  //   temp_max: 281.15
  // },
  // visibility: 10000,
  // wind: {
  //   speed: 4.1,
  //   deg: 80
  // },
  // clouds: {
  //   all: 90
  // },
  // dt: 1485789600,
  // sys: {
  //   type: 1,
  //   id: 5091,
  //   message: 0.0103,
  //   country: 'GB',
  //   sunrise: 1485762037,
  //   sunset: 1485794875
  // },
  // id: 2643743,
  // name: 'London',
  // cod: 200
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

// 2. Add a GET route that returns the projectData

// Initialize all route with a callback function
app.get('/all', getAllData);

// Callback function to complete GET '/all'
function getAllData(req, res) {
  res.send(projectData);
  console.log(projectData);
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
