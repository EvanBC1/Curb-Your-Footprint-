'use strict'


//calling form from HTML

//calling table from HTML
var tableResult = document.getElementById('formTable');
//calling
var resultList = document.getElementById('carbon-emission');
var submitInfo = document.getElementById('submitInfo');

var totalCarbonForm = [];
var userInputArray = [];




//constructor
function User(air, bus, train, subway) {
  this.airCarbonPermile = air;
  this.busCarbonPermile = bus;
  this.railCarbonPerMile = train;
  this.subwayCarbonPerMile = subway;
  userInputArray.push(this);
}


//functions
function renderHeaderRow(){
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'air';
  trEl.appendChild(thEl);
}

renderHeaderRow();


//event handler



// new User (newAir, newBus, newTrain, newSubway);

// overAllTotal = 0;

// formTable.innerHTML = '';


function renderList (){
  for ( var i = 0; i < userInputArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${userInputArray[i].value} string here ${userInputArray[i].views} string here ${userInputArray[i].value} string here `;
    carbonList.appendChild(liEl);
  }
}
renderList();


//event validator
// if(!event.target.says.value || !event.target.who.value){
//   alert('Fields cannot be empty!');
// }

//new instances




//event listener
submitInfo.addEventListener('click', handleSubmitClick);


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
