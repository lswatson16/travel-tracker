// -------------------QUERY SELECTORS-------------------------
const welcomeTraveler = document.getElementById('welcomeTraveler');

// -------------------FUNCTIONS-------------------------
const domUpdates = {
  updateTitle: function(text) {
    welcomeTraveler.innerText = `Welcome ${text}`
  }
}

export default domUpdates;
