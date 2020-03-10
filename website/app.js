// // Function to POST data
// const postData = async (url = '', data = {}) => {
//   console.log(data);

//   const res = await fetch(url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   try {
//     const newData = await res.json();
//     return newData;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// postData('/addAnimal', { animal: 'dog' });

/* Global Variables */
const apiKey = 'a807cf767e6a8225f0b93e3a5a88e431';

btnGenerate = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listeners
btnGenerate.addEventListener('click', getApiData);

function getApiData() {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${apiKey}`
  )
    .then(res => res.json())
    // .then(data => {
    //   let outputData = '<h3>API Data</h3>';
    //   data.data.forEach(item => {
    //     outputData += `
    //         <div class="card card-body mb-3">
    //           <h5>Id: ${item.id}</h5>
    //           <p>Name: ${item.employee_name}</p>
    //           <p>Age: ${item.employee_age}</p>
    //           <p>Salary: ${item.employee_salary}</p>
    //        </div>
    //        <hr />
    //       `;
    //   });
    .then(data => {
      console.log(data);
      document.querySelector('.entry').innerHTML = data.city.name;
    });
}
