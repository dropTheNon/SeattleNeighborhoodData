var app = angular.module('SND', ['ngAnimate', 'ui.router']);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.test = "App is working!";
}]);