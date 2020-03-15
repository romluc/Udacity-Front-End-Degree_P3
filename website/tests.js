/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'a807cf767e6a8225f0b93e3a5a88e431';

btnGenerate = document.querySelector('#generate');

let sequenceError = false;

// Fields fulfilled by user
const zip = document.querySelector('.zip input');
const divContent = document.createElement('div');

// Elements to be updated upon validation
const getContent = document.querySelector('.holder #feelings');
const divTitle = document.querySelector('.entry .title');
const entryHolder = document.querySelector('#entryHolder');

// Dynamic UI requisites
const dynamicUIBuilding = () => {
  zip.setAttribute('id', 'zip');

  const entryHolderDiv = document.querySelector('#entryHolder');

  const headline = document.querySelector('.holder.headline');
  const iconAboveHeadline = document.createElement('div');

  iconAboveHeadline.innerHTML = `<i class="fad fa-2x fa-spin fa-sun"></i>`;

  const divDate = document.createElement('div');
  divDate.setAttribute('id', 'date');
  const divTemp = document.createElement('div');
  divTemp.setAttribute('id', 'temp');
  divContent.setAttribute('id', 'content');
  const divIcon = document.createElement('div');
  divIcon.setAttribute('id', 'icon');

  entryHolderDiv.appendChild(divDate);
  entryHolderDiv.appendChild(divTemp);
  entryHolderDiv.appendChild(divContent);
  entryHolderDiv.appendChild(divIcon);

  headline.prepend(iconAboveHeadline);
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Retrieving information from the external api
const getApiData = async () => {
  const zip = document.querySelector('.zip input').value;
  const sentURL = `${baseURL}${zip},us&appid=${apiKey}`;

  let city = '',
    temperature = '';

  const res = await fetch(sentURL);

  try {
    const data = await res.json();

    if (res.status === 200) {
      // Retrieving also the name of the city for a more accurate response to the user
      city = data.name;

      // temperature retrieved in Kelvin
      temperature = Math.round(data.main.temp - 273);
    }
    return { city, temperature };
  } catch (err) {
    console.warn(err);
  }
};

const getAllData = async baseURL => {
  const res = await fetch(`${baseURL}`);

  try {
    const data = await res.json();
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
  divTitle.innerHTML = `Loading...`;

  const request = await fetch('/all');

  const divDate = document.querySelector('#entryHolder #date');
  const divTemp = document.querySelector('#entryHolder #temp');
  const divContent = document.querySelector('#entryHolder #content');
  const divIcon = document.querySelector('#entryHolder #icon');

  try {
    const data = await request.json();

    const temperature = data.temperature;
    const city = data.city;

    /* Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their innerHTML properties dynamically set according to data returned by the app route.  */

    divTitle.innerHTML = `<h3><strong>Most recent entry</strong></h3>`;
    divTitle.style.cssText = `
      text-align: center;
      margin-bottom: 5px;
      text-decoration: underline;
    `;

    entryHolder.style.cssText = `
      background-color: #fefefe;
      border: 2px solid lightgray;
      border-radius: 4px;
    `;

    divDate.innerHTML = `Today is ${newDate}`;

    divContent.style.color = `black`;

    divContent.innerHTML = `You said ${getContent.value}`;

    // City not found - check if data is returning the error message instead of a valid temperature value
    if (data.city == '') {
      console.log(data.temperature);
      divTemp.innerHTML = `Please check your zip code...Your city was not found in our database =(`;
    } else {
      divTemp.innerHTML = `The temperature today in ${city} is ${temperature}°C`;
      divIcon.innerHTML = `<i class="fal fa-clouds"></i>`;
      divIcon.style.cssText = `
        transition: 0.8s;
        transform: translateX(10%) translateY(30%);
        color: skyblue;
        text-align: center;
        font-size: 2rem;
      `;
    }
  } catch (error) {
    console.log('error', error);
  }
};

dynamicUIBuilding();

const validateUserInput = () => {
  let isValid = true;

  divTitle.style.color = `tomato`;
  divTitle.style.textDecoration = `underline`;

  if (zip.value.length !== 5) {
    // Enhance UX by making errors response more dynamic =)
    if (!sequenceError) {
      divTitle.innerHTML = `Oops...`;
    } else {
      divTitle.innerHTML = `Oops again...`;
    }
    divContent.innerHTML = `<strong>Please use a US valid zip code with 5 algarisms.</strong>
    (e.g., 33129, 10110)`;
    divContent.style.color = `tomato`;
    isValid = false;
    sequenceError = true;
  } else if (getContent.value === '') {
    if (!sequenceError) {
      divTitle.innerHTML = `Oops...`;
    } else {
      divTitle.innerHTML = `Oops again...`;
    }
    divContent.innerHTML = `<strong>Please tell us how you feel today! <strong>
    `;
    divContent.style.color = `tomato`;
    isValid = false;
    sequenceError = true;
  }

  return isValid;
};

// Event listeners
btnGenerate.addEventListener('click', performAction);

function performAction() {
  if (validateUserInput()) {
    getApiData()
      .then(data => {
        postData('/addData', {
          date: newDate,
          city: data.city,
          temperature: data.temperature,
          content: getContent.value
        });
      })
      .then(getAllData('/all'))
      .then(data => updateUI(data));
  }
}
