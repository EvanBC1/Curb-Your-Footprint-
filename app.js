'use strict';

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['CO2 Footprint'],
    datasets: [
      {
        label: 'Commuting',
        data: [6000],
        backgroundColor: '#D6E9C6',
      },
      {
        label: 'Travel',
        data: [4000],
        backgroundColor: '#FAEBCC',
      },
      {
        label: 'Housing',
        data: [2000],
        backgroundColor: '#EBCCD1',
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{ stacked: true}],
      yAxes: [{ stacked: true}]
    }
  }
});

//Testing local storage
//constructor
var userInputArray = [];
var air = 1000;
var bus = 800;
var train = 600;
var subway = 400;

var instance = new User (1000, 800, 600, 400);

function User(air, bus, train, subway) {
  this.airMiles = air;
  this.busMiles = bus;
  this.railMiles = train;
  this.subwayMiles = subway;
  userInputArray.push(this);
  console.log(userInputArray);
}

var testArray = ['cat', 'hat', 'bat'];
localStorage.test = JSON.stringify(userInputArray);
console.log('This is what is in local storage', localStorage.test);