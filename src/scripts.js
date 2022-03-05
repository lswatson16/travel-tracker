// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

import { getTraveler, getTrips, getDestinations } from './apiCalls.js'
import Traveler from './Traveler.js'
import domUpdates from './domUpdates.js'

// -------------------EVENT HANDLERS-------------------------

// -------------------FUNCTIONS-------------------------

let traveler;

function loadTravelerData(id) {
  // getTraveler(id)
    // .then(data => {
    //   traveler = new Traveler(data.id, data.name, data.travelerType)
    //   domUpdates.updateTitle(traveler.name)
    // })

  // getTrips()
    // .then(data => {
    //   console.log('get trips data', data)
    // })

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


      const detailedTrips = filterDestinationsByDestId(data[2].destinations, travelerTrips)
      traveler.trips = detailedTrips
      domUpdates.displayTrips(traveler.trips)
    })

}

// triggers the GET request for single traveler
loadTravelerData(2);


function filterTripsByUserId(trips, travelerId) {
  // console.log('test', trips)
  const filteredTrips = trips.filter(trip => {
    return trip.userID === travelerId;
  })
  console.log('filter trips', filteredTrips)
  return filteredTrips
}

function filterDestinationsByDestId(destinations, filteredTrips) {
  console.log('hello', destinations)
  console.log('hiiii', filteredTrips)
  const result = filteredTrips.map(trip => {

    const foundDestination = destinations.find(destination => {
      return destination.id === trip.destinationID
    })
    console.log('testing', foundDestination)

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
  console.log('result', result)
  return result
}


// function randomId() {
//   return Math.floor(Math.random() * 50);
// };
//
// randomId();
