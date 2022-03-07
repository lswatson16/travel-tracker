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
let traveler, destinations;

// -------------------Event Handlers-------------------------
// window.addEventListener('load', )
tripRequestBtn.addEventListener('click', viewTravelerForm)
travelerForm.addEventListener('submit', addNewTripRequest)
estimateBtn.addEventListener('click', getEstimatedCost)
returnToMainBtn.addEventListener('click', returnToMain)
// -------------------Functions-------------------------

function loadTravelerData(id) {
  Promise.all([getTraveler(id), getTrips(), getDestinations()])
    .then(data => {

      traveler = new Traveler(data[0].id, data[0].name, data[0].travelerType)
      destinations = data[2].destinations
      domUpdates.updateTitle(traveler.name)
      const travelerTrips = filterTripsByUserId(data[1].trips, data[0].id)
      // console.log(traveler)

      const detailedTrips = findDestinationsByDestId(data[2].destinations, travelerTrips)
      traveler.trips = detailedTrips
      domUpdates.displayTrips(traveler.trips)

      const travelExpense = traveler.calcTotalExpensesForYear()
      domUpdates.displayTripExpense(travelExpense)

      domUpdates.createDestinationList(data[2].destinations)
    })
}

// triggers the GET request for the data
loadTravelerData(2);

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

function getNewTripRequest() {
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
  // console.log('new trip>>>>', newTripRequest)
  return newTripRequest
}

function getEstimatedCost() {
  const trip = getNewTripRequest()
  const foundDestination = destinations.find(destination => destination.id === trip.destinationID)
  const totalCost = (foundDestination.estimatedLodgingCostPerDay * trip.duration) + (foundDestination.estimatedFlightCostPerPerson * trip.travelers)
  const fee = totalCost * .10
  const grandTotal = totalCost + fee
  // console.log('grand total', grandTotal)

  const chosenDestination = destinationList.options[destinationList.selectedIndex].value
  if (!requestedDate.value || !requestedDuration.value || !requestedNumTravelers.value || !chosenDestination) {
    domUpdates.displayEmptyStateError()
  } else if (requestedNumTravelers.value >10) {
    domUpdates.displayEstimateErrorNumTravelers()

  } else {
    domUpdates.displayEstimatedCost(grandTotal)
    domUpdates.showSection(submitTripRequest)
    return grandTotal
  }

}

function addNewTripRequest(e) {
  // prevents the default behavior of the form
  e.preventDefault();
  domUpdates.resetInnerHTML(estimatedCost)

  const newTripRequested = getNewTripRequest()

  // after making the request, check if the request was successful
  addTripRequest(newTripRequested)
    .then(data => {
      console.log(data)
      loadTravelerData(2);
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

function viewTravelerForm() {
  domUpdates.showSection(travelerFormSection)
  domUpdates.hideSection(travelerTripsSection)
  domUpdates.hideSection(travelerInfoSection)
  domUpdates.hideSection(submitTripRequest)
}

function returnToMain() {
  domUpdates.showSection(travelerInfoSection)
  domUpdates.showSection(travelerTripsSection)
  domUpdates.hideSection(travelerFormSection)
  domUpdates.resetInnerHTML(estimatedCost)
  travelerForm.reset();
}
