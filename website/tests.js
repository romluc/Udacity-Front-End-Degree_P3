/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'a807cf767e6a8225f0b93e3a5a88e431';

btnGenerate = document.querySelector('#generate');

// Dynamic UI requisites
const dynamicUIBuilding = () => {
  const zip = document.querySelector('.zip input');
  zip.setAttribute('id', 'zip');

  const entryHolderDiv = document.querySelector('#entryHolder');

  const divDate = document.createElement('div');
  divDate.setAttribute('id', 'date');
  const divTemp = document.createElement('div');
  divTemp.setAttribute('id', 'temp');
  const divContent = document.createElement('div');
  divContent.setAttribute('id', 'content');

  entryHolderDiv.appendChild(divDate);
  entryHolderDiv.appendChild(divTemp);
  entryHolderDiv.appendChild(divContent);
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Retrieving information from the external api
const getApiData = async () => {
  const zip = document.querySelector('.zip input').value;
  const sentURL = `${baseURL}${zip},us&appid=${apiKey}`;

  const res = await fetch(sentURL);

  try {
    const data = await res.json();
    console.log(data);

    if (res.status === 404) {
      const message = `Please check your zip code... Your city was not found in our database! =(`;
      return message;
    }

    // Retrieving also the name of the city for a more accurate response to the user
    const city = data.name;

    // temperature retrieved in Kelvin
    const temp = data.main.temp;

    const tempInCelsius = Math.round(temp - 273);

    return { city, tempInCelsius };
  } catch (err) {
    console.log('error', err);
  }
};

const getAllData = async baseURL => {
  const res = await fetch(`http://localhost:3000${baseURL}`);

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.table('error', error);
  }
};

const updateUI = async data => {
  const request = await fetch('http://localhost:3000/all');
  try {
    const data = await request.json();
    const temperature = data.temperature;
    const city = data.city;

    const divDate = document.querySelector('#entryHolder #date');
    const divContent = document.querySelector('#entryHolder #content');
    const getContent = document.querySelector('.holder #feelings');

    /* Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their innerHTML properties dynamically set according to data returned by the app route.  */

    divDate.innerHTML = `Today is ${newDate}`;
    divContent.innerHTML = `You said ${getContent.value}`;
    getContent.value = 'Thank you! Have a great day! =)';
    console.log(data);

    // City not found - check if data is returning the error message instead of a valid temperature value
    if (typeof data.temperature == 'string') {
      document.querySelector(
        '#entryHolder > #temp'
      ).innerHTML = `Please check your zip code...Your city today was not found in our database =(`;
    } else {
      document.querySelector(
        '#entryHolder > #temp'
      ).innerHTML = `The temperature in ${city} today is ${temperature}°C`;
    }
  } catch (error) {
    console.log('error', error);
  }
};

dynamicUIBuilding();

// Event listeners
btnGenerate.addEventListener('click', performAction);

function performAction() {
  getApiData()
    .then(data => {
      postData('http://localhost:3000/addData', {
        date: newDate,
        city: data.city,
        temperature: data.tempInCelsius,
        content: document.querySelector('.holder #feelings').value
      });
    })
    .then(getAllData('/all'))
    .then(data => updateUI(data));
}
