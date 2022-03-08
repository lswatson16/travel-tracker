class Trip {
  constructor({ id, userID, destinationID, travelers, date, duration, alt }) {
    // console.log('id', id)
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
    this.alt = alt;
  };
};

export default Trip;
