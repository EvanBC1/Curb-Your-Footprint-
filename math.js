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
  console.log(Math.round(lbsOfCo2));
}

function calculateTravelEmissions () {
  var testArray =
    [['air', 1000],
      ['bus', 800],
      ['train', 600],
      ['subway', 400]
    ];
  var airCarbonPerMile = .40124132;
  var busCarbonPerMile = .130072735;
  var railCarbonPermile = .357148865;
  var subwayCarbonPerMile = .264555;
  var totalCarbon = 0;
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
calculateTravelEmissions ();
calculateCarEmissions();
