import { expect } from 'chai';
import Traveler from '../src/Traveler';

describe('User', () => {
  let traveler;

  beforeEach(function() {
    traveler = new Traveler(1, 'Ham Leadbeater', 'relaxer');

  });

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should instantiate a Traveler', function () {
    expect(traveler).to.be.an.instanceof(Traveler)
  });
});
