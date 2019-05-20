'use strict';


function calculateCarEmissions () {
  // Car emit: 19.6 pound per gallon of gas
  // Miles driven per year / MPG * 19.6
  // Example 10,000 / 30 * 19.6 = 6,533.33 lbs of CO2 per year
  var mpg = 30;
  var milesDriven = 10000;
  var co2PerGallon = 19.6;
  var lbsOfCo2 = 0;
  lbsOfCo2 = milesDriven / mpg * co2PerGallon;
  console.log(lbsOfCo2);
}
