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

  data: [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body:
        'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
      userId: 1,
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body:
        'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
    }
  ]
};

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

// 2. Add a GET route that returns the projectData

// Initialize all route with a callback function
app.get('/all', getAllData);

// Callback function to complete GET '/all'
function getAllData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

// Post Route
app.post('/addData', postData);

function postData(req, res) {
  const { userId, id, title } = req.body;
  projectData = {
    userId,
    id,
    title
  };

  res.send(req.body);
  console.log(projectData);
}
