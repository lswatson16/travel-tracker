class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = [];
  }

  calcTotalExpensesForYear() {
    // console.log('trips', this.trips)

    const allTripExpenses = this.trips.map((trip) => {
      let flightExpenses = trip.estimatedFlightCostPerPerson * trip.travelers
      let lodgingExpenses = trip.estimatedLodgingCostPerDay * trip.duration
      let expensesObj = {
        tripFlightExpense: flightExpenses,
        tripLodgingExpense: lodgingExpenses
      }
      return expensesObj
    })

    const totalExpense = allTripExpenses.reduce((acc, expense) => {
      let tripTotal = expense.tripFlightExpense + expense.tripLodgingExpense
      acc += tripTotal
      return acc
    }, 0)

    const fee = totalExpense * .10
    const grandTotal = totalExpense + fee
    return grandTotal
  }
}

export default Traveler;
