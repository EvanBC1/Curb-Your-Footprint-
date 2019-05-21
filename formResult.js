'user strict';


//calling form from HTML
var infoForm = document.getElementById('infoForm');
//calling table from HTML
var tableResult = document.getElementById('formTable');

var testArrayForm = [];
var totalCarbonForm = [];
var newUser = [];


//constructor 
function User (air, bus, train, subway) {
    this.airCarbonPermile = air;
    this.busCarbonPermile = bus;
    this.railCarbonPerMile = train;
    this.subwayCarbonPerMile = subway;
}

//stores test array of carbon emitted
this.testArrayForm = [];
this.totalCarbonForm = [];

//populatuing carbon array
newUser.push(this)



//functions
function renderHeaderRow(){
    var trRl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = 'air';
    trEl.appenChild(thEl);
}
    

//event handler
function handleInformationForm (event){
    event.preventDefault();
}
var newAir = event.target.air.value;
var newBus = event.target.busWay.value;
var newTrain = event.target.railWay.value;
var newSubway = even.target.subWay.value;

new User (newAir, newBus, newTrain, newSubway);

overAllTotal = 0;

formTable.innerHTML = '';



//event listener
informationForm.addEventListener('submit', infoForm);
