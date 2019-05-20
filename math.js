'use strict';

//Global variables
var airCarbonPerMile = .40124132;
var busCarbonPerMile = .130072735;
var railCarbonPermile = .357148865;
var subwayCarbonPerMile = .264555;
var co2PerGallon = 19.6;
var totalCarbon = 0;
var mpg = 25;
var milesDriven = 10000;
var percentMilesReplacedByBus = .5;
var carbonReleasedByDriving = 0;

function calculateCarEmissions () {
  // Car emit: 19.6 pound per gallon of gas
  // Miles driven per year / MPG * 19.6
  // Example 10,000 / 30 * 19.6 = 6,533.33 lbs of CO2 per year
  carbonReleasedByDriving = Math.round(milesDriven / mpg * co2PerGallon);
  console.log(`${carbonReleasedByDriving} pounds of carbon produced by driving`);
  
}

function calculateTravelEmissions () {
  var testArray =
    [['air', 1000],
      ['bus', 800],
      ['train', 600],
      ['subway', 400]
    ];
  for (var i = 0; i < testArray.length; i++) {
    var carbonEmitted = 0;
    if (testArray[i][0] === 'air') {
      carbonEmitted = Math.round(testArray[i][1] * airCarbonPerMile);
      console.log(`${carbonEmitted} pound of carbon emitted.`);
      totalCarbon += carbonEmitted;
    } else if (testArray[i][0] === 'bus') {
      carbonEmitted = Math.round(testArray[i][1] * busCarbonPerMile);
      console.log(`${carbonEmitted} pound of carbon emitted.`);
      totalCarbon += carbonEmitted;
    } else if (testArray[i][0] === 'train') {
      carbonEmitted = Math.round(testArray[i][1] * railCarbonPermile);
      console.log(`${carbonEmitted} pound of carbon emitted.`);
      totalCarbon += carbonEmitted;
    }else if (testArray[i][0] === 'subway') {
      carbonEmitted = Math.round(testArray[i][1] * subwayCarbonPerMile);
      console.log(`${carbonEmitted} pound of carbon emitted.`);
      totalCarbon += carbonEmitted;
    }
  }
  console.log(`${totalCarbon} total pounds of carbon emitted.`);
}

function recommendations (carbonReleasedByDriving) {
  var busEfficiency = busCarbonPerMile / (co2PerGallon / mpg); 
  var carbonSaved = Math.round((carbonReleasedByDriving * percentMilesReplacedByBus) - ((carbonReleasedByDriving * percentMilesReplacedByBus) * busEfficiency)) ;
  console.log(`Driving a bus emmits only ${Math.round(busEfficiency * 100)}% of the carbon per mile that your car does. By bussing 50% of your miles driven than you could prevent ${carbonSaved} lbs of CO2 from being emmited anually.`); 
}


calculateCarEmissions();
calculateTravelEmissions ();
recommendations(carbonReleasedByDriving);