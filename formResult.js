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

//storing data
function createLocalStorage(){
  localStorage.setItem('createLocalStorage', userInputArray);
  console.log(userInputArray);
}
function renderUserArray (){
  for ( var i = 0; i < userInputArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${userInputArray[i].name} was viewed ${userInputArray[i].views} times and receieved ${userInputArray[i].votes} of votes `;
    tableResult.appendChild(liEl);
  }
  createLocalStorage();
}
renderUserArray();

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
}
//event listener
allInformationForm.addEventListener('submit', handleSubmitClick);

