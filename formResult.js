'use strict';

var resultsArray = [];
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

//clearing local storage
localStorage.clear();

// Displaying results
var displayResults = document.getElementById('displayResults');

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
var carbonProducedByAir = 0;
var carbonProducedByBus = 0;
var carbonProducedByRail = 0;
var carbonProducedBySubway = 0;

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
  carbonProducedByAir = Math.round(retrievedData.airMiles * airCarbonPerMile);
  carbonProducedByBus = Math.round(retrievedData.busMiles * busCarbonPerMile);
  carbonProducedByRail = Math.round(retrievedData.railMiles * railCarbonPerMile);
  carbonProducedBySubway = Math.round(retrievedData.subwayMiles * subwayCarbonPerMile);
  resultsArray.push(`${carbonProducedByAir} pounds of carbon released by flying`);
  resultsArray.push(`${carbonProducedByBus} pounds of carbon released by riding on the bus`);
  resultsArray.push(`${carbonProducedByRail} pounds of carbon released by riding the train`);
  resultsArray.push(`${carbonProducedBySubway} pounds of carbon released by riding the subway`);
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

  resultsArray.push(`This year you will release ${totalCarbon} pounds of carbon. However by following the below recomendations you can reduce your footprint`);
  resultsArray.push(`With solar you could be saving ${carbonSavedSolar} pounds of carbon per year`);
  resultsArray.push(`Taking the bus emmits only ${Math.round(busEfficiency * 100)}% of the carbon per mile that your car does. By bussing 50% of your miles driven than you could prevent ${carbonSavedBusing} lbs of CO2 from being emmited anually.`);
  resultsArray.push(`Or if you rode a bike for those mile you would reduce your carbon emissions by ${carbonSavedBiking} pounds per year`);
  resultsArray.push(`If you replaced 10 incandecent bulbs with LED bulbs you could reduce your carbon footprint by ${carbonSavedWithLeds} pounds a year`);
  resultsArray.push(`If you made all these changes you could reduce your footprint by ${percentSaved}% down to ${totalCarbon - totalCarbonSaved} pounds!`);
  console.log(resultsArray[2]);
  drawFootprint ();
  renderResults();
}

/////////// Creating Table ///////////

function renderResults (){
  var ulEL = document.createElement('ul');
  displayResults.appendChild(ulEL);
  for (var i = 0; i < resultsArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = resultsArray[i];
    ulEL.appendChild(liEl);
  }
}


/////////// Drawing Charts ///////////

function drawFootprint () {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['CO2 Footprint in pounds of CO2 released'],
      datasets: [
        {
          label: 'Commuting by Car',
          data: [carbonReleasedByDriving],
          backgroundColor: '#D6E9C6',
        },
        {
          label: 'Air Travel',
          data: [carbonProducedByAir],
          backgroundColor: '#5DADE2',
        },
        {
          label: 'Bus Travel',
          data: [carbonProducedByBus],
          backgroundColor: '#815DE2',
        },
        {
          label: 'Rail Travel',
          data: [carbonProducedByRail],
          backgroundColor: '#C35DE2',
        },
        {
          label: 'Subway Travel',
          data: [carbonProducedBySubway],
          backgroundColor: '#E25DBF',
        },
        {
          label: 'Housing',
          data: [CarbonReleasedFromElectricity],
          backgroundColor: '#EBCCD1',
        }
      ],
    },
    options: {
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 18,
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: 'white',
            fontSize: 18,
            beginAtZero: true,
          },
          stacked: true,
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white',
            fontSize: 14,
            beginAtZero: true,
          },
          stacked: true,

        }],
      },
    },
  });
}
//event listener
allInformationForm.addEventListener('submit', handleSubmitClick);

