// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

import getTraveler from './apiCalls.js'
import Traveler from './Traveler.js'
import domUpdates from './domUpdates.js'

// -------------------EVENT HANDLERS-------------------------

// -------------------FUNCTIONS-------------------------

let traveler;

function loadTravelerData(id) {
  getTraveler(id)
    .then(data => {
      traveler = new Traveler(data.id, data.name, data.travelerType)
      domUpdates.updateTitle(traveler.name)
    })
}

// triggers the GET request for single traveler
loadTravelerData(1);





// function randomId() {
//   return Math.floor(Math.random() * 50);
// };
//
// randomId();
