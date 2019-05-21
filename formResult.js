


//calling form from HTML
var submitInfo = document.getElementById('submitInfo');
//calling table from HTML
var tableResult = document.getElementById('formTable');
//calling 
var resultList = document.getElementById('carbon-emission');


var totalCarbonForm = [];
var allData = [];



//constructor
function User (air, bus, train, subway) {
  this.airCarbonPermile = air;
  this.busCarbonPermile = bus;
  this.railCarbonPerMile = train;
  this.subwayCarbonPerMile = subway;
}

//stores test array of carbon emitted
this.userInputArray= [];


//populatuing carbon array
allData.push(this);



//functions
function renderHeaderRow(){
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'air';
  trEl.appendChild(thEl);
}

renderHeaderRow();


//event handler
function handleInformationForm (event){
  event.preventDefault();
}

// var newAir = event.target.air.value;
// var newBus = event.target.busWay.value;
// var newTrain = event.target.railWay.value;
// var newSubway = event.target.subWay.value;


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
window.onload = function(){
  submitInfo.addEventListener('click', handleSubmitClick);
};
function handleSubmitClick(){
  console.log('hello');
}
