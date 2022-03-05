const getTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response =>response.json())
    .then(data => {
      // console.log('fetch data', data)
      return data
    })
    .catch(err => console.log(err))
}

const getTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => {
      // console.log('trip data', data)
      return data
    })
    .catch(err => console.log(err))
}

export { getTraveler, getTrips };
