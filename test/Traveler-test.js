import { expect } from 'chai';
import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let traveler, trips;

  beforeEach(function() {
    traveler = new Traveler(1, 'Ham Leadbeater', 'relaxer');
  });

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should instantiate a Traveler', function () {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should keep track of a collection of trips specific to the current traveler', function () {
    expect(traveler.trips).to.eql([]);
  });

  it('it should calculate the total expenses for the year that includes a 10% travel agent fee', function () {
    traveler.trips = [
      {
        image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        alt: "white and brown concrete buildings near sea under white clouds during daytime",
        destination: "San Juan, Puerto Rico",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 900,
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: []
      }
    ];

    expect(traveler.trips).to.eql([
      {
        image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        alt: "white and brown concrete buildings near sea under white clouds during daytime",
        destination: "San Juan, Puerto Rico",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 900,
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: []
      }
    ]);

    expect(traveler.calcTotalExpensesForYear('2020')).to.equal(0);
    expect(traveler.calcTotalExpensesForYear('2021')).to.equal(4125);
  });
});
