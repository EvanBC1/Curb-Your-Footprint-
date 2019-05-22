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
  this.airCarbonPerMile = air;
  this.busCarbonPerMile = bus;
  this.railCarbonPerMile = train;
  this.subwayCarbonPerMile = subway;
  userInputArray.push(this);
  this.mpg = mpg;
  this.milesDriven = mileage;
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
  console.log(tableData);
  localStorage.setItem('userDataOne',JSON.stringify(tableData));
  console.log('this is whats in ls',localStorage);
}

function renderUserArray (){
  for ( var i = 0; i < userInputArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${userInputArray[i].event} was viewed ${userInputArray[i].event} times and receieved ${userInputArray[i].event} of votes `;
    liEl.appendChild(liEl);
  }
}
renderUserArray();

//event listener
allInformationForm.addEventListener('submit', handleSubmitClick);

