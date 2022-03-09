# 🛫 Travel Tracker 🛬

## ✈ Overview
Travel Tracker is an application that has two user interfaces, the traveler and the travel agent. Both users can log in to view their dashboard.

The traveler's dashboard displays all of the traveler's trips and their annual travel expenses. The traveler can view an estimate for a potential trip and request a new trip.

The travel agent dashboard displays new trip requests by travelers. The agent can view their total yearly income and the traveler's on trips for the current year. The travel agent can approve and deny any pending trips; and search for a user by their name in order to:
- view that travelers trips and expenses
- approve trip request
- delete upcoming trips.

## ✈ Instructions/Installations

- Here's the [Deploy Link](https://lswatson16.github.io/travel-tracker/) to interact with the application I built
- For this project, I used the [Webpack Starter Kit](https://github.com/turingschool-examples/webpack-starter-kit) repo. The setup instructions are in the README. I also cloned down this [local server](https://github.com/turingschool-examples/travel-tracker-api) and had it running in a separate tab in my terminal each time I ran my client.
  - Use command `git clone` to clone the repo
  - `cd` into the directory
  - Run `npm install` to download all necessary packages and dependencies
  - Run `npm start` to run the server
    - Go to `http://localhost:8080/` and you should see a page with some `h1` text, Turing logo image and a beautiful gradient background. If that's the case, you're good to go.
    - Enter `control + c` in your terminal to stop the server at any time.

## ✈ Features
### Login
![Login](https://media.giphy.com/media/CFhwqipm6beQDN4AhP/giphy.gif)

When you first arrive at the site, the user must login with their correct credentials in order to navigate to their dashboard.
- A message will alert the user if the incorrect username and password was entered.
- Upon successful login, the traveler will see their dashboard which displays all their trips, a trip request form and an annual expense report for the current year.

### New Trip Request Form
![Trip Request](https://media.giphy.com/media/MuKzYFAEOpRjjNeXiR/giphy.gif)

- The traveler can see the estimate cost for a new trip by filling out the form.
- The traveler can make a new trip request by submitting the form.
- The trip request form handles these errors and alerts the user to resolve:
  - all input fields must be filled
  - the selected dates cannot be a date in the past
  - number of travelers has a max of 10

### Filter Trips
The trips displayed can be filtered by all, past, upcoming, and pending trips.

### Log Out
The user can sign out to navigate back to the login screen.

## ✈ Future Features
- Responsive design

## ✈ Technologies Used
* Javascript
* CSS
* HTML
* Webpack
* Mocha/Chai
* Lighthouse

## ✈ Links
- [Deploy Link](https://lswatson16.github.io/travel-tracker/)
- [GitHub repo](https://github.com/lswatson16/travel-tracker)

## ✈ Contributors
- [Lauralyn Watson](https://github.com/lswatson16)
- [Heather Faerber](https://github.com/hfaerber) as Project Manager
- [Emily Cathleen](https://github.com/Emily-Cathleen) as reviewer
