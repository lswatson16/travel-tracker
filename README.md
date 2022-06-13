# 🛫 Travel Tracker 🛬

## ✈ Overview
Travel Tracker has two user interfaces, the traveler and the travel agent. Both users can log in to view their dashboard.

The traveler's dashboard displays all of the traveler's trips and their annual travel expenses. The traveler can view an estimate for a potential trip and request a new trip.

The travel agent dashboard displays new trip requests by travelers. The agent can view their total yearly income and the traveler's on trips for the current year. The travel agent can approve and deny any pending trips; and search for a user by their name in order to:
- View that travelers trips and expenses
- Approve trip request
- Delete upcoming trips.

## ✈ Instructions/Installations

### Get Started
Client-side server
  - In the terminal, run the command `git clone` to clone this repo
  - `cd` into the directory `cd travel-tracker`
  - Run `npm install` to download all necessary packages and dependencies
  - Run `npm start` to run the client-side server
    - Go to `http://localhost:8080/`
    - Enter `control + c` in your terminal to stop the server at any time.

Back-end server
  - In a separate directory on your local machine, clone down this [back-end server](https://github.com/turingschool-examples/travel-tracker-api) using command `git clone`
    - In a separate terminal tab, run the back-end API each time you run the client-side server.
    - Running on `localhost:3001`
    - Enter `control + c` in your terminal to stop the server at any time.

### Build Your Own Travel Tracker
For this project, I used the [Webpack Starter Kit](https://github.com/turingschool-examples/webpack-starter-kit) repo. The setup instructions are in the README. I also cloned down this [server](https://github.com/turingschool-examples/travel-tracker-api) and had it running in a separate tab in my terminal each time I ran my client-side server.

## ✈ Features
### Login
![Login](https://media.giphy.com/media/CFhwqipm6beQDN4AhP/giphy.gif)

When you first arrive at the site, the user must login with their correct credentials in order to navigate to their dashboard.
- To log in use ***travel[:id]*** as the username and ***travel*** as the password. For example, username: ***traveler12*** and password: ***travel***
- A message will alert the user if the incorrect username and password was entered.
- Upon successful login, the traveler will see their dashboard which displays all their trips, a trip request form and an annual expense report for the current year.

### New Trip Request Form
![Trip Request](https://media.giphy.com/media/MuKzYFAEOpRjjNeXiR/giphy.gif)

- The traveler can see the estimate cost for a new trip by filling out the form.
- The traveler can make a new trip request by submitting the form.
- The trip request form handles these errors and alerts the user to resolve:
  - All input fields must be filled
  - The selected dates cannot be a date in the past
  - Number of travelers has a max of 10

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
- [GitHub repo](https://github.com/lswatson16/travel-tracker)

## ✈ Contributors
- [Lauralyn Watson](https://github.com/lswatson16)
- [Heather Faerber](https://github.com/hfaerber) as Project Manager
- [Richard Rosa-Serrano](https://github.com/RosaTheDev) as reviewer
- [Emily Cathleen](https://github.com/Emily-Cathleen) as reviewer
