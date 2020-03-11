/* Global Variables */
const apiKey = 'a807cf767e6a8225f0b93e3a5a88e431';

btnGenerate = document.querySelector('#generate');

// Dynamic UI requisites
const dynamicBuilding = () => {
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

const getApiData = async baseURL => {
  const res = await fetch(`http://localhost:3000${baseURL}`);

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

// Function to POST data
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

const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try {
    const data = await request.json();
    document.querySelector('.entry').innerHTML = data.title;
  } catch (error) {
    console.log('error', error);
  }
};

// Event listeners
btnGenerate.addEventListener('click', e => {
  getApiData('/all')
    .then(
      postData('http://localhost:3000/addData', {
        userId: '333',
        id: '124',
        title: 'asdf asdf asdf and more asdf'
      })
    )
    .then(updateUI());
});

dynamicBuilding();
