'use strict';

//Carbon Counter
var pounds = 0;
var el = document.getElementById('counter');

function incrementSeconds() {
  pounds += 2570000;
  el.innerText = 'Humans have created ' + pounds + ' pounds of carbon since you have visited.';
}
var cancel = setInterval(incrementSeconds, 500);
incrementSeconds();