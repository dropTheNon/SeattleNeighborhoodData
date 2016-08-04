var app = angular.module('SND', ['ngAnimate', 'ui.router']);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.test = "App is working!";

  // $scope.d3LineChart = function() {
  //   var margin = {top: 20, right: 20, bottom: 30, left: 50},
  //       width = 960 - margin.left - margin.right,
  //       height = 500 - margin.top - margin.bottom;

  //   var formatDate = d3.time.format("%m/%d/%Y");

  //   var x = d3.time.scale().range([0, width]);

  //   var y = d3.scale.linear().range([height, 0]);

  //   var xAxis = d3.svg.axis().scale(x).orient("bottom");

  //   var yAxis = d3.svg.axis().scale(y).orient("left");

  //   var line = d3.svg.line()
  //       .x(function(d) { return x(d.REPORT_DATE); })
  //       .y(function(d) { return y(d.STAT_VALUE); });

  //   var svg = d3.select("#d3LineChart").append("svg")
  //       .attr("width", width + margin.left + margin.right)
  //       .attr("height", height + margin.top + margin.bottom)
  //       .append("g")
  //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //   var someData = "data/seattleCrime.csv";

  //   d3.csv(someData, type, function(error, data) {
  //     if (error) throw error;
  //     console.log(data);

  //     x.domain(d3.extent(data, function(d) { return d.REPORT_DATE; }));
  //     y.domain(d3.extent(data, function(d) { return d.STAT_VALUE; }));

  //     svg.append("g")
  //       .attr("class", "x axis")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(xAxis);

  //     svg.append("g")
  //       .attr("class", "y axis")
  //       .call(yAxis)
  //       .append("text")
  //       .attr("transform", "rotate(-90)")
  //       .attr("y", 6)
  //       .attr("dy", ".71em")
  //       .style("text-anchor", "end")
  //       .text("Incidents by month");

  //     svg.append("path")
  //       .datum(data)
  //       .attr("class", "line")
  //       .attr("d", line);
  //   });

  //   function type(d) {
  //     d.REPORT_DATE = formatDate.parse(d.REPORT_DATE);
  //     d.STAT_VALUE = +d.STAT_VALUE;
  //     console.log(d.STAT_VALUE);
  //     return d;
  //   }
  // };

  $scope.d3BarChart = function() {
    var dataHomicide = [],
        dataRape = [],
        dataRobbery = [],
        dataAssault = [],
        dataBurglary = [],
        dataLarcenyTheft = [],
        dataMotorVehicleTheft = [];

    var width = 960,
        height = 500;
    console.log('Our height:', height);
    var y = d3.scale.linear().range([height, 0]);
    console.log(y(2));

    var chart = d3.select('#d3BarChart')
        .attr('width', width)
        .attr('height', height);

    var someData = "data/seattleCrime.csv";

    d3.csv("data/seattleCrime.csv", type, function(error, data) {
      // console.log(data);

      for (var d = 0; d < data.length; d++) {
        switch (data[d].CRIME_TYPE) {
          case "Homicide":
            dataHomicide.push(data[d]);
          break

          case "Rape":
            dataRape.push(data[d]);
          break

          case "Robbery":
            dataRobbery.push(data[d]);
          break

          case "Assault":
            dataAssault.push(data[d]);
          break

          case "Larceny-Theft":
            dataLarcenyTheft.push(data[d]);
          break

          case "Motor Vehicle Theft":
            dataMotorVehicleTheft.push(data[d]);
          break

          case "Burglary":
            dataBurglary.push(data[d]);
          break

          default:
          break
        }
      }

      console.log(dataRobbery);

      y.domain([0, d3.max(dataRobbery, function(d) { return d.STAT_VALUE })]);

      var barWidth = width / dataRobbery.length;

      var bar = chart.selectAll("g")
          .data(dataRobbery)
          .enter().append("g")
          .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
          .attr("y", function(d) {
            return y(parseInt(d.STAT_VALUE)); 
          })
          .attr("height", function(d) { return height - y(parseInt(d.STAT_VALUE)); })
          .attr("width", barWidth - 1);

      bar.append("text")
          .attr("x", barWidth / 2)
          .attr("y", function(d) { return y(parseInt(d.STAT_VALUE)) + 3; })
          .attr("dy", ".75em")
          .text(function(d) { return parseInt(d.STAT_VALUE); });
    });

    function type(d) {
      d.STAT_VALUE = +parseInt(d.STAT_VALUE); 
      return d;
    }
  }

  // $scope.getData = function() {
  //   $http.get('https://somesite.com', {
  //     params: {

  //     }
  //   })
  //   .then(function success(res) {
  //     console.log(res);
  //   }, function error(res) {
  //     console.log(res);
  //   });
  // }
}]);