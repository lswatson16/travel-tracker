// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

import { getTraveler, getTrips, getDestinations, addTripRequest } from './apiCalls.js'
import Traveler from './Traveler.js'
import domUpdates from './domUpdates.js'

// -------------------Global Variables-------------------------
let traveler;

// -------------------Event Handlers-------------------------
travelerForm.addEventListener('submit', addNewTripRequest)
// -------------------Functions-------------------------


function loadTravelerData(id) {
  Promise.all([getTraveler(id), getTrips(), getDestinations()])
    .then(data => {
      // console.log('promise data', data)
      console.log('traveler data', data[0])
      console.log('trip data', data[1])
      console.log('destination data', data[2])

      traveler = new Traveler(data[0].id, data[0].name, data[0].travelerType)
      domUpdates.updateTitle(traveler.name)
      const travelerTrips = filterTripsByUserId(data[1].trips, data[0].id)
      console.log(traveler)


      const detailedTrips = findDestinationsByDestId(data[2].destinations, travelerTrips)
      traveler.trips = detailedTrips
      domUpdates.displayTrips(traveler.trips)

      const travelExpense = traveler.calcTotalExpensesForYear()
      domUpdates.displayTripExpense(travelExpense)

      domUpdates.createDestinationList(data[2].destinations)
      // findDestinationId(data[2].destinations)
    })

}

// triggers the GET request for the data
loadTravelerData(2);

// triggers the POST request to add new trip
// addNewTripRequest()


function filterTripsByUserId(trips, travelerId) {
  const filteredTrips = trips.filter(trip => {
    return trip.userID === travelerId;
  })
  return filteredTrips
}

function findDestinationsByDestId(destinations, filteredTrips) {
  const result = filteredTrips.map(trip => {

    const foundDestination = destinations.find(destination => {
      return destination.id === trip.destinationID
    })

    let obj = {
      image: foundDestination.image,
      alt: foundDestination.alt,
      destination: foundDestination.destination,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: trip.status,
      suggestedActivities: trip.suggestedActivities
    }
    return obj
  })
  return result
}

function addNewTripRequest(e) {
  // prevents the default behavior of the form
  e.preventDefault();
  const newTripRequestId = Math.round(getRandomNum(400, 500))

  const newTripRequest = {
		id: newTripRequestId,
		userID: traveler.id,
		destinationID: parseInt(destinationList.options[destinationList.selectedIndex].value),
		travelers: parseInt(requestedNumTravelers.value),
		date: requestedDate.value.split('-').join('/'),
		duration: parseInt(requestedDuration.value),
		status: "pending",
		suggestedActivities: []
  }
  console.log('new trip>>>>', newTripRequest)

  // after making the request, check if the request was successful
  addTripRequest(newTripRequest)
    .then(data => {
      console.log(data)
      return data
    })
    .catch(err => {
      console.log('err in scripts', err)
    })

  travelerForm.reset();
}

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

// function randomId() {
//   return Math.floor(Math.random() * 50);
// };
//
// randomId();
