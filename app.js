'use strict';

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['CO2 Footprint'],
    datasets: [
      {
        label: 'Commuting',
        data: [6000],
        backgroundColor: '#D6E9C6',
      },
      {
        label: 'Travel',
        data: [4000],
        backgroundColor: '#FAEBCC',
      },
      {
        label: 'Housing',
        data: [2000],
        backgroundColor: '#EBCCD1',
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{ stacked: true}],
      yAxes: [{ stacked: true}]
    }
  }
});