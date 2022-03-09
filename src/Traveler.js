class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType || '';
    this.trips = [];
  }

  calcTotalExpensesForYear(year) {
    let fee, grandTotal;
    const filteredTripsByYear = this.trips.filter(trip => {
      return trip.date.includes(year);
    });

    const result = filteredTripsByYear.reduce((acc, trip) => {
      const totalFlightCost = trip.estimatedFlightCostPerPerson * trip.travelers;
      const totalLodgingCost = trip.estimatedLodgingCostPerDay * trip.duration;
      const totalCost = totalFlightCost + totalLodgingCost;
      return acc += totalCost;
    }, 0);

    fee = result * .10;
    grandTotal = result + fee;
    return grandTotal;
  };
};

export default Traveler;
