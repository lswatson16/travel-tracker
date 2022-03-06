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
      return data
    })
}

export { getTraveler, getTrips, getDestinations };
