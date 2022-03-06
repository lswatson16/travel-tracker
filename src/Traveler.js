class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = [];
  }

  calcTotalExpensesForYear() {
    console.log('trips', this.trips)
    const filteredTripsByYear = this.trips.filter(trip => {
      return trip.date.includes("2020")
    })

    console.log('filtered by year', filteredTripsByYear)
    const result = filteredTripsByYear.reduce((acc, trip) => {
      let totalFlightCost = trip.estimatedFlightCostPerPerson * trip.travelers
      console.log('flight cost', totalFlightCost)
      let totalLodgingCost = trip.estimatedLodgingCostPerDay * trip.duration
      console.log('lodging cost', totalLodgingCost)
      let totalCost = totalFlightCost + totalLodgingCost
      console.log('total', totalCost)
      return acc += totalCost
    }, 0)

    console.log('result', result)
    let fee = result * .10
    let grandTotal = result + fee
    console.log('grandTotal', grandTotal)
    return grandTotal
  }
}

export default Traveler;
