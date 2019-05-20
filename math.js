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
  var airCarbon = .40124132;
  var busCarbon = .130072735;
  var railCarbon = .357148865;
  var subwayCarbon = .264555;
  for (var i = 0; i < testArray.length; i++) {
    if (testArray[i][0] === 'air') {
      console.log(Math.round(testArray[i][1] * airCarbon));
    } else if (testArray[i][0] === 'bus') {
      console.log(Math.round(testArray[i][1] * busCarbon));
    } else if (testArray[i][0] === 'train') {
      console.log(Math.round(testArray[i][1] * railCarbon));
    }else if (testArray[i][0] === 'subway') {
      console.log(Math.round(testArray[i][1] * subwayCarbon));
    }
  }
}
calculateTravelEmissions ();
calculateCarEmissions();
