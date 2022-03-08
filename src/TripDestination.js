class TripDestination {
  constructor({ id, userID, destinationID, travelers, date, duration, alt, image, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson }) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
    this.image = image || '';
    this.alt = alt || '';
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;

  };
};

export default TripDestination;
