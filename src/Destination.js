class Destination {
  constructor(id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson, image, alt) {
    this.id = id;
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;
    this.image = image || '';
    this.alt = alt || '';
  };
};

export default Destination;
