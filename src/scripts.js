// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

import { getTraveler, getTrips, getDestinations, addTripRequest } from './apiCalls.js'
import Traveler from './Traveler.js'
import TripDestination from '../src/TripDestination';
import domUpdates from './domUpdates.js'

// -------------------Global Variables-------------------------
let traveler, destinations;

// -------------------Event Handlers-------------------------
// window.addEventListener('load', )
travelerForm.addEventListener('submit', addNewTripRequest)
estimateBtn.addEventListener('click', getEstimatedCost)
logInBtn.addEventListener('click', checkLogInCredentials)
signOutBtn.addEventListener('click', showLogInSection)
// -------------------Functions-------------------------

function loadTravelerData(id) {
  Promise.all([getTraveler(id), getTrips(), getDestinations()])
    .then(data => {
      console.log(data[0])
      console.log(data[1])
      console.log(data[2])

      traveler = new Traveler(data[0].id, data[0].name, data[0].travelerType)
      destinations = data[2].destinations
      domUpdates.updateTitle(traveler.name)
      const travelerTrips = filterTripsByUserId(data[1].trips, data[0].id)
      // console.log(traveler)

      const detailedTrips = findDestinationsByDestId(data[2].destinations, travelerTrips)
      console.log('detailed trips', detailedTrips)
      const tripInstances = detailedTrips.map(detailedTrip => {
        const newTrip = new TripDestination(detailedTrip)
        return newTrip
      })
      console.log('tripInstances', tripInstances)

      traveler.trips = tripInstances;
      console.log('test travel trips', traveler.trips)
      domUpdates.displayTrips(traveler.trips)

      // update the hardcoded year to pull from current year
      var today = new Date();
      var year = today.getFullYear();
      console.log('test', year)
      // const travelExpense = traveler.calcTotalExpensesForYear('2020')
      const travelExpense = traveler.calcTotalExpensesForYear(year)
      domUpdates.displayTripExpense(travelExpense.toFixed(2))

      domUpdates.createDestinationList(data[2].destinations)
    })
}

// triggers the GET request for the data
// loadTravelerData(2);

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

    const alt = foundDestination.alt === undefined ? '' : foundDestination.alt

    let tripWithDestinationInfo = {
      image: foundDestination.image,
      alt: alt,
      destination: foundDestination.destination,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: trip.status,
      suggestedActivities: trip.suggestedActivities,
      id: trip.id,
      userID: trip.userID,
      destinationID: trip.destinationID,
    }
    return tripWithDestinationInfo
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

  const today = getTodaysDate();
  const chosenDestination = destinationList.options[destinationList.selectedIndex].value

  if (!requestedDate.value || !requestedDuration.value || !requestedNumTravelers.value || !chosenDestination) {
    domUpdates.displayEmptyStateError()
  } else if (requestedNumTravelers.value > 10) {
    domUpdates.displayEstimateErrorNumTravelers()
  } else if(requestedDate.value < today) {
      domUpdates.displayDateError()
  } else {
    domUpdates.displayEstimatedCost(grandTotal)
    domUpdates.showSection(submitTripRequest)
    return grandTotal
  }
}

function getTodaysDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  domUpdates.updateMinToToday(today)
  return today
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
      loadTravelerData(traveler.id)
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

function checkLogInCredentials() {
  const id = username.value.slice(8)
  console.log(username.value)
  console.log(id)
  if (0 < id && id <= 50 && password.value === 'travel') {
    console.log("valid id")

    hideLogInSection()
    loadTravelerData(id)
    logInForm.reset()
    return id
  } else {
    console.log("not a valid id")
    domUpdates.displayInvalidLogIn()
    logInForm.reset()
  }
}

function showLogInSection() {
  domUpdates.hideSection(signOutBtn)
  domUpdates.showSection(logInSection)
  domUpdates.hideSection(userDashboard)
}

function hideLogInSection() {
  domUpdates.showSection(signOutBtn)
  domUpdates.hideSection(logInSection)
  domUpdates.showSection(userDashboard)
}

// function filterTrips(trips) {
//   return trips.filter(trip => {
//     let date = getTodaysDate()
//     console.log('testinggg', date)
//
//     // return trip.date.includes(date)
//   })
// }

// filterTrips(traveler.trips)
