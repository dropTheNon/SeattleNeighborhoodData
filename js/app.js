var app = angular.module('SND', ['ngAnimate', 'ui.router']);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.test = "App is working!";

  $scope.crimedata = [];
  $scope.crimes = [];

  $scope.search = function() {
    var req = {
      url: 'https://data.policefoundation.org/resource/wah5-z3am.json',
      method: 'GET',
      params: {
        zone_beat: 'B2',
        year: 2014
      }
    };

    $http(req).then(function success(res) {
      if(res.status === 200) {
      $scope.crimedata = res.data
      $scope.crimedata.forEach(function(crime) {
        var month = new Date(crime.date_reported)
        month = month.getMonth()+1
        if (month === 7) {
          $scope.crimes.push(crime);
          console.log(crime);
        }
      });
      } console.log($scope.crimedata);
    }, function error(res) {
      console.log(res.data);
    });
  
  };
  $scope.search();

}]);