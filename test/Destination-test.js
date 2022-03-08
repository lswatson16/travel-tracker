import { expect } from 'chai';
import Destination from '../src/Destination';

describe('Destination', () => {
  let destination

  beforeEach(function() {
    destination = new Destination(1, 'Lima, Peru', 70, 400, "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", "overview of city buildings with a clear sky");
  });

  it('should be a function', function () {
    expect(Destination).to.be.a('function');
  });

  it('should instantiate a Destination', function () {
    expect(destination).to.be.an.instanceof(Destination);
  });

  it('should have an id', function () {
    expect(destination.id).to.equal(1);
  });

  it('should have an destination', function () {
    expect(destination.destination).to.equal('Lima, Peru');
  });

  it('should have an estimate cost of lodging per day', function () {
    expect(destination.estimatedLodgingCostPerDay).to.equal(70);
  });

  it('should have an estimate cost of flight per person', function () {
    expect(destination.estimatedFlightCostPerPerson).to.equal(400);
  });

  it('should have an image of the beautiful destination', function () {
    expect(destination.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it('should have an alt attribute for the image', function () {
    expect(destination.alt).to.equal("overview of city buildings with a clear sky");
  });



}
