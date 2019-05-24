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

//clearing local storage
localStorage.clear();

// Displaying results
var displayResults = document.getElementById('displayResults');

//constructor
function User(kwhUsed, kwhProduced, Bulbs,mileage, mpg, air, bus, train, subway){
  this.kwhUsed = kwhUsed;
  this.kwhProduced = kwhProduced;
  this.Bulbs = Bulbs;
  this.milesDriven = mileage;
  this.mpg = mpg;
  this.airMiles = air;
  this.busMiles = bus;
  this.railMiles = train;
  this.subwayMiles = subway;
  userInputArray.push(this);
}

//event handler
function handleSubmitClick(event){
  event.preventDefault();
  var newKwhUsed = parseInt(event.target.kwhUsed.value);
  var newKwhProduced = parseInt(event.target.kwhProduced.value);
  var newBulbs = parseInt(event.target.Bulbs.value);
  var newMileage = parseInt(event.target.mileage.value);
  var newMpg = parseInt(event.target.mpg.value);
  var newAir = parseInt(event.target.air.value);
  var newBus = parseInt(event.target.busWay.value);
  var newTrain = parseInt(event.target.railWay.value);
  var newSubway = parseInt(event.target.subWay.value);
 
  var tableData = new User (newKwhUsed, newKwhProduced, newBulbs, newMileage, newMpg, newAir, newBus, newTrain, newSubway);
  localStorage.setItem('userDataOne',JSON.stringify(tableData));
  console.log('this is whats in ls',localStorage);
  retrieveDataFromLS();
}

function handleClearClick(){
  console.log('click');
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
var CarbonReleasedFromElectricity = 0;
var solarProduction = 0;
var carbonProducedByAir = 0;
var carbonProducedByBus = 0;
var carbonProducedByRail = 0;
var carbonProducedBySubway = 0;

function calculateCarEmissions (retrievedData) {
  carbonReleasedByDriving = Math.round(retrievedData.milesDriven / retrievedData.mpg * co2PerGallon);
  totalCarbon += carbonReleasedByDriving;
  calculateHousingEmissions(retrievedData);
}

function calculateHousingEmissions (retrievedData) {
  CarbonReleasedFromElectricity = Math.round(retrievedData.kwhUsed * 12 * carbonPerKWH);
  solarProduction = retrievedData.kwhProduced * 4 * 365;
  totalCarbon += CarbonReleasedFromElectricity;
  calculateTravelEmissions(retrievedData);
}

function calculateTravelEmissions (retrievedData) {
  carbonProducedByAir = Math.round(retrievedData.airMiles * airCarbonPerMile);
  carbonProducedByBus = Math.round(retrievedData.busMiles * busCarbonPerMile);
  carbonProducedByRail = Math.round(retrievedData.railMiles * railCarbonPerMile);
  carbonProducedBySubway = Math.round(retrievedData.subwayMiles * subwayCarbonPerMile);
  totalCarbon += carbonProducedByAir + carbonProducedByBus + carbonProducedByRail + carbonProducedBySubway;
  recommendations(retrievedData);
}

function recommendations (retrievedData) {
  var busEfficiency = busCarbonPerMile / (co2PerGallon / retrievedData.mpg);
  var carbonSavedSolar = CarbonReleasedFromElectricity - solarProduction;
  var carbonSavedBusing = Math.round((carbonReleasedByDriving * percentMilesReplacedByBus) - ((carbonReleasedByDriving * percentMilesReplacedByBus) * busEfficiency)) ;
  var carbonSavedBiking = carbonReleasedByDriving / 5;
  var carbonSavedWithLeds = Math.round(carbonPerKWH * 37.2 * retrievedData.Bulbs);
  var totalCarbonSaved = carbonSavedSolar + carbonSavedBusing + carbonSavedBiking + carbonSavedWithLeds;
  var percentSaved = Math.round(((totalCarbon - (totalCarbon - totalCarbonSaved)) / totalCarbon) * 100);

  //Result output
  resultsArray.push(`This year you will release ${totalCarbon} pounds of carbon. Your breakdown is as follows:`);
  resultsArray.push(`${CarbonReleasedFromElectricity} pounds of carbon released by your home`);
  resultsArray.push(`${carbonReleasedByDriving} pounds of carbon released by driving your car`);
  resultsArray.push(`${carbonProducedByAir} pounds of carbon released by flying`);
  resultsArray.push(`${carbonProducedByBus} pounds of carbon released by riding on the bus`);
  resultsArray.push(`${carbonProducedByRail} pounds of carbon released by riding the train`);
  resultsArray.push(`${carbonProducedBySubway} pounds of carbon released by riding the subway`);
  
  //Recomendation
  resultsArray.push('Fret not as we have some recomendations to lower your foot print listed below:');
  resultsArray.push(`By adding solar you could be saving ${carbonSavedSolar} pounds of carbon per year`);
  resultsArray.push(`Taking the bus emmits only ${Math.round(busEfficiency * 100)}% of the carbon per mile that your car does. By busing 50% of your miles driven than you could prevent ${carbonSavedBusing} lbs of CO2 from being emmited anually.`);
  resultsArray.push(`If in addition to busing you replaced 20% of the miles you drove with biking biking you would reduce your carbon emissions by an additional ${carbonSavedBiking} pounds per year`);
  resultsArray.push(`If you replaced ${retrievedData.Bulbs} incandecent bulbs with LED bulbs you could reduce your carbon footprint by ${carbonSavedWithLeds} pounds a year`);
  resultsArray.push(`If you made all these changes you could reduce your footprint by ${percentSaved}% down to ${totalCarbon - totalCarbonSaved} pounds!`);
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
allInformationForm.addEventListener('clear', handleClearClick);