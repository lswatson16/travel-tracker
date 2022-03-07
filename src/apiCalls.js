const getTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response =>response.json())
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
}

const getTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
}

const getDestinations = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .then(data => {
      // console.log('destination data', data)
      return data
    })
    .catch(err => console.log(err))
}

const addTripRequest = (data) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('add trip', data)
    return data
  })
  .catch(err => console.log(err))
}

export { getTraveler, getTrips, getDestinations, addTripRequest };
