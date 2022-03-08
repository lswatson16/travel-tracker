import { expect } from 'chai';
import Trip from '../src/Trip';

describe('Trip', () => {
  let trip;

  beforeEach(function() {
    trip = new Trip(409, 12, 35, 3, "2022/03/15", 3);
  });

  it('should be a function', function () {
    expect(Trip).to.be.a('function');
  });

  it('should instantiate a Trip', function () {
    expect(trip).to.be.an.instanceof(Trip);
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
});
