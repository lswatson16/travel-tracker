class Trip {
  constructor(id, userID, destinationID, travelers, date, duration) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
  };
};

export default Trip;
