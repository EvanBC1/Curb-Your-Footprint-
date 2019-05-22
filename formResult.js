'use strict';


//calling table from HTML
var tableResult = document.getElementById('formTable');
//calling
var resultList = document.getElementById('carbon-emission');
//calling submit button
var submitInfo = document.getElementById('submitInfo');

var userInputArray = [];

//global variable for DOM
var allInformationForm = document.getElementById('informationForm');

//objects
var travel = ['airTravel', 'busTravel', 'trainTravel', 'subwayTravel'];

localStorage.clear();

//constructor
function User(mileage, mpg, air, bus, train, subway){
  this.airMiles = air;
  this.busMiles = bus;
  this.railMiles = train;
  this.subwayMiles = subway;
  this.mpg = mpg;
  this.milesDriven = mileage;
  userInputArray.push(this);
}


//event handler
function handleSubmitClick(event){
  event.preventDefault();
  var newAir = parseInt(event.target.air.value);
  var newBus = parseInt(event.target.busWay.value);
  var newTrain = parseInt(event.target.railWay.value);
  var newSubway = parseInt(event.target.subWay.value);
  var newMpg = parseInt(event.target.mpg.value);
  var newMileage = parseInt(event.target.mileage.value);

  var tableData = new User (newMileage, newMpg, newAir, newBus, newTrain, newSubway);
  localStorage.setItem('userDataOne',JSON.stringify(tableData));
  console.log('this is whats in ls',localStorage);
  retrieveDataFromLS();
}

function renderUserArray (){
  for ( var i = 0; i < userInputArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${userInputArray[i].event} was viewed ${userInputArray[i].event} times and receieved ${userInputArray[i].event} of votes `;
    liEl.appendChild(liEl);
  }
}
renderUserArray();


///////////Form Math///////////

//take data from local storage
function retrieveDataFromLS () {
  var retrievedData = JSON.parse(localStorage.getItem('userDataOne'));
  console.log('data retrieved', retrievedData);
  calculateCarEmissions(retrievedData);
}

//Global variables
var airCarbonPerMile = .40124132;
var busCarbonPerMile = .130072735;
var railCarbonPerMile = .357148865;
var subwayCarbonPerMile = .264555;
var co2PerGallon = 19.6;
var totalCarbon = 0;
var percentMilesReplacedByBus = .5;
var carbonReleasedByDriving = 0;
var carbonPerKWH = 1.04;
var averageKWH = 11764;
var solarSystem = 5;
var CarbonReleasedFromElectricity = 0;
var solarProduction = 0;

function calculateCarEmissions (retrievedData) {
  carbonReleasedByDriving = Math.round(retrievedData.milesDriven / retrievedData.mpg * co2PerGallon);
  console.log(`${carbonReleasedByDriving} pounds of carbon released by driving`);
  totalCarbon += carbonReleasedByDriving;
  calculateHousingEmissions(retrievedData);
}


function calculateHousingEmissions (retrievedData) {
  CarbonReleasedFromElectricity = Math.round(averageKWH * carbonPerKWH);
  console.log(`${CarbonReleasedFromElectricity} pounds of carbon released by your electricity usage`);
  // KW of system * hours of full sun a day * days in a year
  solarProduction = solarSystem * 4 * 365;
  totalCarbon += CarbonReleasedFromElectricity;
  calculateTravelEmissions(retrievedData);
}

function calculateTravelEmissions (retrievedData) {
  var carbonProducedByAir = Math.round(retrievedData.airMiles * airCarbonPerMile);
  var carbonProducedByBus = Math.round(retrievedData.busMiles * busCarbonPerMile);
  var carbonProducedByRail = Math.round(retrievedData.railMiles * railCarbonPerMile);
  var carbonProducedBySubway = Math.round(retrievedData.subwayMiles * subwayCarbonPerMile);
  console.log(`${carbonProducedByAir} pounds of carbon released by flying`);
  console.log(`${carbonProducedByBus} pounds of carbon released by riding on the bus`);
  console.log(`${carbonProducedByRail} pounds of carbon released by riding the train`);
  console.log(`${carbonProducedBySubway} pounds of carbon released by riding the subway`);
  totalCarbon += carbonProducedByAir + carbonProducedByBus + carbonProducedByRail + carbonProducedBySubway;
  recommendations(retrievedData);
}

function recommendations (retrievedData) {
  var busEfficiency = busCarbonPerMile / (co2PerGallon / retrievedData.mpg);
  var carbonSavedSolar = CarbonReleasedFromElectricity - solarProduction;
  var carbonSavedBusing = Math.round((carbonReleasedByDriving * percentMilesReplacedByBus) - ((carbonReleasedByDriving * percentMilesReplacedByBus) * busEfficiency)) ;
  var carbonSavedBiking = carbonReleasedByDriving / 2;
  var carbonSavedWithLeds = Math.round(carbonPerKWH * 37.2 * 10);
  var totalCarbonSaved = carbonSavedSolar + carbonSavedBusing + carbonSavedBiking + carbonSavedWithLeds;
  var percentSaved = Math.round(((totalCarbon - (totalCarbon - totalCarbonSaved)) / totalCarbon) * 100);
  console.log(`This year you will release ${totalCarbon} pounds of carbon. However by following the below recomendations you can reduce your footprint`);
  console.log(`With solar you could be saving ${carbonSavedSolar} pounds of carbon per year`);
  console.log(`Taking the bus emmits only ${Math.round(busEfficiency * 100)}% of the carbon per mile that your car does. By bussing 50% of your miles driven than you could prevent ${carbonSavedBusing} lbs of CO2 from being emmited anually.`);
  console.log(`Or if you rode a bike for those mile you would reduce your carbon emissions by ${carbonSavedBiking} pounds per year`);
  console.log(`If you replaced 10 incandecent bulbs with LED bulbs you could reduce your carbon footprint by ${carbonSavedWithLeds} pounds a year`);
  console.log(`If you made all these changes you could reduce your footprint by ${percentSaved}% down to ${totalCarbon - totalCarbonSaved} pounds!`); 
}

/////////// Drawing Charts ///////////
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['CO2 Footprint in pounds of CO2 released'],
    datasets: [
      {
        label: 'Commuting by Car',
        data: [6000],
        backgroundColor: '#D6E9C6',
      },
      {
        label: 'Air Travel',
        data: [4000],
        backgroundColor: '#5DADE2',
      },
      {
        label: 'Bus Travel',
        data: [4000],
        backgroundColor: '#815DE2',
      },
      {
        label: 'Rail Travel',
        data: [4000],
        backgroundColor: '#C35DE2',
      },
      {
        label: 'Subway Travel',
        data: [4000],
        backgroundColor: '#E25DBF',
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

//event listener
allInformationForm.addEventListener('submit', handleSubmitClick);
