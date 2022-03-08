// -------------------QUERY SELECTORS-------------------------
const welcomeTraveler = document.getElementById('welcomeTraveler');
const tripWidgetSection = document.getElementById('tripWidgetSection');
const tripDestination = document.getElementById('tripDestination');
const totalExpense = document.getElementById('totalExpense');
const destinationList = document.getElementById('destinationList');

const tripRequestBtn = document.getElementById('tripRequestBtn');
const travelerForm = document.getElementById('travelerForm');
const requestedDate = document.getElementById('requestedDate');
const requestedDuration = document.getElementById('requestedDuration');
const requestedNumTravelers = document.getElementById('requestedNumTravelers');
const estimateBtn = document.getElementById('estimateBtn');
const estimatedCost = document.getElementById('estimatedCost');
const returnToMainBtn = document.getElementById('returnToMainBtn');

const travelerFormSection = document.getElementById('travelerFormSection');
const travelerTripsSection = document.getElementById('travelerTripsSection');
const travelerInfoSection = document.getElementById('travelerInfoSection');

const logInForm = document.getElementById('logInForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const logInBtn = document.getElementById('logInBtn');
const signOutBtn = document.getElementById('signOutBtn');

// -------------------FUNCTIONS-------------------------
const domUpdates = {
  updateTitle: function(text) {
    welcomeTraveler.innerText = `Welcome ${text}`
  },

  displayTripExpense: function(cost) {
    totalExpense.innerText = `$${cost}`
  },

  createDestinationList: function(destinations) {
    destinations.forEach(destination => {
      destinationList.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
    })
  },

  displayTrips: function(trips) {
    tripWidgetSection.innerHTML = ''
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
  },

  displayEstimatedCost: function(cost) {
    estimatedCost.innerText = `Estimated Cost: $${cost}`
  },

  updateMinToToday: function(date) {
    requestedDate.setAttribute('min', date)
  },

  displayEmptyStateError: function() {
    window.alert('Please fill out all fields to get a new quote')
  },

  displayDateError: function() {
    window.alert('Please select a date that is not in the past')
  },

  displayEstimateErrorNumTravelers: function() {
    window.alert('Sorry, you can only book for a max number of 10 travelers')
  },

  displayInvalidLogIn: function() {
    window.alert('Sorry, please enter a valid username and password')
  },

  resetInnerHTML: function(element) {
    element.innerText = ``
  },

  showSection: function(element) {
    element.classList.remove('hidden');
  },

  hideSection: function(element) {
    element.classList.add('hidden');
  }
};

export default domUpdates;
