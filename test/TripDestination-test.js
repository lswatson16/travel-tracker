import { expect } from 'chai';
import TripDestination from '../src/TripDestination';

describe('TripDestination', () => {
  let trip;

  beforeEach(function() {
    trip = new TripDestination({
      id: 409,
      userID: 12,
      destinationID: 35,
      travelers: 3,
      date: '2022/03/15',
      duration: 3,
      image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky',
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 180,
      estimatedFlightCostPerPerson: 940
    });
  });

  it('should be a function', function () {
    expect(TripDestination).to.be.a('function');
  });

  it('should instantiate a TripDestination', function () {
    expect(trip).to.be.an.instanceof(TripDestination);
  });

  it('should have an id', function () {
    expect(trip.id).to.equal(409);
  });

  it('should have an user id', function () {
    expect(trip.userID).to.equal(12);
  });

  it('should have an destination id', function () {
    expect(trip.destinationID).to.equal(35);
  });

  it('should have travelers', function () {
    expect(trip.travelers).to.equal(3);
  });

  it('should have a date', function () {
    expect(trip.date).to.equal("2022/03/15");
  });

  it('should have a duration', function () {
    expect(trip.duration).to.equal(3);
  });

  it('should have a status', function () {
    expect(trip.status).to.equal('pending');
  });

  it('should have a list of suggested activities', function () {
    expect(trip.suggestedActivities).to.eql([]);
  });

  it('should have an image of the beautiful destination', function () {
    expect(trip.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80');
  });

  it('should have an alt attribute for the image', function () {
    expect(trip.alt).to.equal('overview of city buildings with a clear sky');
  });

  it('should have an destination', function () {
    expect(trip.destination).to.equal('Lima, Peru');
  });

  it('should have an estimate cost of lodging per day', function () {
    expect(trip.estimatedLodgingCostPerDay).to.equal(180);
  });

  it('should have an estimate cost of flight per person', function () {
    expect(trip.estimatedFlightCostPerPerson).to.equal(940);
  });

  it('should have an empty string if no image or alt attribute is passed in to destination instance', function () {
    let destinationNoWhere = new TripDestination({
      id: 409,
      userID: 6,
      destinationID: 44,
      travelers: 8,
      date: '2022/09/15',
      duration: 22,
      destination: 'Castle Rock',
      estimatedLodgingCostPerDay: 12,
      estimatedFlightCostPerPerson: 140
    });

    expect(destinationNoWhere.image).to.equal('');
    expect(destinationNoWhere.alt).to.equal('');
  });
});
