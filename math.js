'use strict';

//Global variables
var airCarbonPerMile = .40124132;
var busCarbonPerMile = .130072735;
var railCarbonPerMile = .357148865;
var subwayCarbonPerMile = .264555;
var co2PerGallon = 19.6;
var totalCarbon = 0;
var carMpg = 25;
var milesDriven = 10000;
var percentMilesReplacedByBus = .5;
var carbonReleasedByDriving = 0;
var carbonPerKWH = 1.04;
var averageKWH = 11764;
var solarSystem = 5;

function calculateCarEmissions () {
  // Car emit: 19.6 pound per gallon of gas
  // Miles driven per year / MPG * 19.6
  // Example 10,000 / 30 * 19.6 = 6,533.33 lbs of CO2 per year
  carbonReleasedByDriving = Math.round(milesDriven / carMpg * co2PerGallon);
  console.log(`${carbonReleasedByDriving} pounds of carbon produced by driving`);
}

function calculateHousingEmissions () {
  var CarbonReleasedFromElectricity = Math.round(averageKWH * carbonPerKWH);
  console.log(`${CarbonReleasedFromElectricity} pounds of carbon released by your electricity usage`);
  // KW of system * hours of full sun a day * days in a year
  var solarProduction = solarSystem * 4 * 365;
  console.log(`With solar you could be saving ${CarbonReleasedFromElectricity - solarProduction} pounds of carbon per year`);
}

function calculateTravelEmissions () {
  var carbonProducedByAir = Math.round(testFromLS[0].airMiles * airCarbonPerMile);
  var carbonProducedByBus = Math.round(testFromLS[0].busMiles * busCarbonPerMile);
  var carbonProducedByRail = Math.round(testFromLS[0].railMiles * railCarbonPerMile);
  var carbonProducedBySubway = Math.round(testFromLS[0].subwayMiles * subwayCarbonPerMile);
  console.log(carbonProducedByAir + ' ' + carbonProducedByBus + ' ' + carbonProducedByRail + ' ' + carbonProducedBySubway);
  totalCarbon = carbonProducedByAir + carbonProducedByBus + carbonProducedByRail + carbonProducedBySubway;
  console.log(totalCarbon);
  // var testArray = 
  //   [['air', 1000],
  //     ['bus', 800],
  //     ['train', 600],
  //     ['subway', 400]
  //   ];
  // console.log('Test Array', testArray);
  // console.log('test from LS', testFromLS);
  // for (var i = 0; i < testArray.length; i++) {
  //   var carbonEmitted = 0;
  //   if (testArray[i][0] === 'air') {
  //     carbonEmitted = Math.round(testArray[i][1] * airCarbonPerMile);
  //     console.log(`${carbonEmitted} pound of carbon emitted.`);
  //     totalCarbon += carbonEmitted;
  //   } else if (testArray[i][0] === 'bus') {
  //     carbonEmitted = Math.round(testArray[i][1] * busCarbonPerMile);
  //     console.log(`${carbonEmitted} pound of carbon emitted.`);
  //     totalCarbon += carbonEmitted;
  //   } else if (testArray[i][0] === 'train') {
  //     carbonEmitted = Math.round(testArray[i][1] * railCarbonPermile);
  //     console.log(`${carbonEmitted} pound of carbon emitted.`);
  //     totalCarbon += carbonEmitted;
  //   }else if (testArray[i][0] === 'subway') {
  //     carbonEmitted = Math.round(testArray[i][1] * subwayCarbonPerMile);
  //     console.log(`${carbonEmitted} pound of carbon emitted.`);
  //     totalCarbon += carbonEmitted;
  //   }
  // }
  // console.log(`${totalCarbon} total pounds of carbon emitted.`);
}



function recommendations (carbonReleasedByDriving) {
  var busEfficiency = busCarbonPerMile / (co2PerGallon / carMpg); 
  var carbonSaved = Math.round((carbonReleasedByDriving * percentMilesReplacedByBus) - ((carbonReleasedByDriving * percentMilesReplacedByBus) * busEfficiency)) ;
  console.log(`Driving a bus emmits only ${Math.round(busEfficiency * 100)}% of the carbon per mile that your car does. By bussing 50% of your miles driven than you could prevent ${carbonSaved} lbs of CO2 from being emmited anually.`);
  console.log(`Or if you rode a bike for those mile you would reduce your carbon emissions by ${carbonReleasedByDriving / 2} pounds per year`);
  console.log(`For each incandecent bulb you replace you can reduce your carbon footprint by ${Math.round(carbonPerKWH * 37.2)} pounds a year`);
  console.log(``) 
}




//Local storage test
console.log('This is also in local storage', localStorage.test);

if(localStorage.test) {
  var testFromLS = JSON.parse(localStorage.test);
  console.log('getting name',testFromLS[0]);
  new User(testFromLS);
  
  
}

calculateCarEmissions();
calculateHousingEmissions ();
calculateTravelEmissions ();
recommendations(carbonReleasedByDriving);

//Counter
var pounds = 0;
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
  pounds += 2570000;
  el.innerText = "Humans have created " + pounds + " pounds of carbon since you have visited.";
}

var cancel = setInterval(incrementSeconds, 500);