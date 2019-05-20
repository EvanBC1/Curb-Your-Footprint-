'user strict';


//calling form
var infoForm = document.getElementById('informationForm')

//global variable for results form, holds the instances of air, busway, railway, subway, 
var travelSumArray = [];



//function to calculate travel summary
function getRandomIntInclusive(travel, miles) {
    travel = Math.ceil(travel);
    miles = Math.floor(mile);
    return Math.floor(Math.random() * (travel - min + 1)) + min;
  }

//constructor
function Summary (air, bus, train, subway,) {
    this.mpg = mpg;
    this.milesDriven = milesDriven;
    this.saco2PerGallon = co2PerGallon;
    this.lbsOfCo2 = lbsOfCo2;
  
    //summary per array
    
  
    //populating all array
    