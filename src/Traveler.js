class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = [];
  }

  calcTotalExpensesForYear() {
    console.log('trips', this.trips)

    const allTripExpenses = this.trips.map((trip) => {
      let expensesObj = {}
      let flightExpenses = trip.estimatedFlightCostPerPerson * trip.travelers
      console.log('flight cost', flightExpenses)

      let lodgingExpenses = trip.estimatedLodgingCostPerDay * trip.duration
      console.log('lodging cost', lodgingExpenses)

      expensesObj = {
        tripFlightExpense: flightExpenses,
        tripLodgingExpense: lodgingExpenses
      }
      return expensesObj
    })

    console.log('allExpenses obj', allTripExpenses)

    const totalExpense = allTripExpenses.reduce((acc, expense) => {
      let tripTotal = expense.tripFlightExpense + expense.tripLodgingExpense
      acc += tripTotal
      return acc
    }, 0)

    console.log('total', totalExpense)

    const fee = totalExpense * .10
    const grandTotal = totalExpense + fee
    console.log(fee)
    console.log(grandTotal)
    return grandTotal

  }
}

export default Traveler;
