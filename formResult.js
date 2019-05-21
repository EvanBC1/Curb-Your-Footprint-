'use strict';

//calling table from HTML
var tableResult = document.getElementById('formTable');
//calling
var resultList = document.getElementById('carbon-emission');
var submitInfo = document.getElementById('submitInfo');

var userInputArray = [];

//global variable for DOM
var allInformationForm = document.getElementById('informationForm');

//objects
var travel = ['airTravel', 'busTravel', 'trainTravel', 'subwayTravel'];


//constructor
function User(air, bus, train, subway){
  this.airCarbonPerMile = air;
  this.busCarbonPerMile = bus;
  this.railCarbonPerMile = train;
  this.subwayCarbonPerMile = subway;
  userInputArray.push(this);
  this.carMpg = [];
  this.milesDriven = [];
  this.totalMpgMilesDriven = 0;
  this.calcMilesMileagePerGallon = function(){
    for (var i = 0; i < travel.length; i++){
      this.carMpg.push(getRandomInt(this.airCarbonPerMile, this.busCarbonPerMile));
    }
  };
}
//new instances

var airWay = new User (1000, 'air');
var busWay =  User (800, 'bus');
var trainWay = new User (600, 'train');
var subWay = new User (400, 'subway');

var addNewInfo = new User (newAir, newBus, newTrain, newSubway);
console.log(addNewInfo);

//ul list result for car (mileage, and miles per gallon)
function renderUnorderedList(){
  var ulEl = document.createElement('ul');
  var liEl = document.createElement('li');
  ulEl.textContent = 'air';
  liEl.appendChild(ulEl);
}
renderUnorderedList();
userInputArray();



//event handler
function renderList (){
  for ( var i = 0; i < userInputArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${userInputArray[i].value} string here ${userInputArray[i].views} string here ${userInputArray[i].value} string here `;
    resultList.appendChild(liEl);
  }
}
renderList();

//event listener
submitInfo.addEventListener('tableResult', handleSubmitClick);


function handleSubmitClick(event){
  event.preventDefault();
  var newAir = event.target.air.value;
  var newBus = event.target.busWay.value;
  var newTrain = event.target.railWay.value;
  var newSubway = event.target.subWay.value;

  var tableData = new User (newAir, newBus, newTrain, newSubway);
  console.log(tableData);

  console.log('hello');
}
