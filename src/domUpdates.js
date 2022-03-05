// -------------------QUERY SELECTORS-------------------------
const welcomeTraveler = document.getElementById('welcomeTraveler');
const tripWidgetSection = document.getElementById('tripWidgetSection')
const tripDestination = document.getElementById('tripDestination')

// -------------------FUNCTIONS-------------------------
const domUpdates = {
  updateTitle: function(text) {
    welcomeTraveler.innerText = `Welcome ${text}`
  },

  displayTrips: function(trips) {
    trips.forEach((trip) => {
      tripWidgetSection.innerHTML += `
      <section class="trip-widget" id="tripWidget">
        <div class="trip-image-container">
          <img class="trip-image" id="tripImage" src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80" alt="aeriel view of Lima, Peru">
        </div>
        <div class="trip-details-container">
          <h3 class="trip-destination" id="tripDestination">📍Lima, Peru</h3>
          <div class="trip-details">
            <p class="trip-detail-title">Est. Lodging Cost/Day:</p>
            <p class="trip-lodging-cost" id="tripLodgingCost">70</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Est. Flight Cost/Person:</p>
            <p class="trip-flight-cost" id="tripFlightCost">400</p>
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
      </section>
      `;
    });


    // tripDestination.innerText = ``
  }
}

export default domUpdates;
