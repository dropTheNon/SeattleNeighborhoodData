var app = angular.module('SND', ['ngAnimate', 'ui.router', 'uiGmapgoogle-maps']);

app.config(['uiGmapGoogleMapApiProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function(GoogleMapApiProviders, $stateProvider, $urlRouterProvider, $locationProvider) {
  GoogleMapApiProviders.configure({
    china: true});

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'MainCtrl'
  })
  .state('neighborhood', {
    url: '/neighborhood',
    templateUrl: 'views/neighborhood.html',
    controller: 'NeighborhoodCtrl'
  });

  $locationProvider.html5Mode(true);
}]);

app.controller('NeighborhoodCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.map = {center: {latitude: 47.673401, longitude: -122.342598}, zoom: 14};

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
        }
      });
      } console.log($scope.crimedata);
    }, function error(res) {
      console.log(res.data);
    });
  
  };
  $scope.search();

  $scope.hidden = true;
  $scope.clicked = false;
  $scope.onClick = function () {
    $scope.clicked = !$scope.clicked;
    $scope.hidden = !$scope.hidden;
  };

}]);

app.controller('MainCtrl', ['$scope', function($scope) {
  $scope.test = "App is working!";
}]);