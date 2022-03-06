// -------------------QUERY SELECTORS-------------------------
const welcomeTraveler = document.getElementById('welcomeTraveler');
const tripWidgetSection = document.getElementById('tripWidgetSection');
const tripDestination = document.getElementById('tripDestination');
const totalExpense = document.getElementById('totalExpense');
const destinationList = document.getElementById('destinationList');

// -------------------FUNCTIONS-------------------------
const domUpdates = {
  updateTitle: function(text) {
    welcomeTraveler.innerText = `Welcome ${text}`
  },

  displayTripExpense: function(cost) {
    totalExpense.innerText = `${cost}`
  },

  createDestinationList: function(destinations) {
    console.log('test', destinations[0].destination)
    destinations.forEach(destination => {
      destinationList.innerHTML += `<option value="${destination.destination}">`
    })
  },

  displayTrips: function(trips) {
    trips.forEach(trip => {
      tripWidgetSection.innerHTML += `
      <section class="trip-widget" id="tripWidget">
        <div class="trip-image-container">
          <img class="trip-image" id="tripImage" src=${trip.image} alt=${trip.alt}>
        </div>
        <div class="trip-details-container">
          <h3 class="trip-destination" id="tripDestination">${trip.destination}</h3>
          <div class="trip-details">
            <p class="trip-detail-title">Est. Lodging Cost/Day:</p>
            <p class="trip-lodging-cost" id="tripLodgingCost">${trip.estimatedLodgingCostPerDay}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Est. Flight Cost/Person:</p>
            <p class="trip-flight-cost" id="tripFlightCost">${trip.estimatedFlightCostPerPerson}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Travelers:</p>
            <p class="trip-traveler-count" id="tripTravelerNum">${trip.travelers}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Date:</p>
            <p class="trip-date" id="tripDate">${trip.date}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Duration:</p>
            <p class="trip-duration" id="tripDuration">${trip.duration}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Status:</p>
            <p class="trip-status" id="tripStatus">${trip.status}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Suggested Activities:</p>
            <p class="trip-activities" id="tripActivities">${trip.suggestedActivities}</p>
          </div>
        </div>
      </section>`;
    });
  }
};

export default domUpdates;
