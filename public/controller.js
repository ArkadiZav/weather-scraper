var app = angular.module('weather', []);
app.controller('weather-controller', ['$scope','$http', function($scope, $http) {
  $scope.showOrHideViews = {
    weather: false,
    spinner: false
  };
  // input field autocomplete init
  var userinput = document.getElementById("userInput");
  var autocomplete = new google.maps.places.Autocomplete(userinput);
  // end autocomplete field init
  console.log("in controller");
  $scope.handleSearch = function() {
    console.log("started search");
    $scope.showOrHideViews.weather = false;
    $scope.showOrHideViews.spinner = true;
    $scope.weather = null;
    $http.get('http://localhost:8080/get_weather/' + $scope.weather_location)
    .then(function(weather) {
      $scope.showOrHideViews.weather = true;
      $scope.showOrHideViews.spinner = false;
      $scope.weather_location = ""; // NOTE: reset input value
      $scope.weather = weather.data;
      console.log(weather);
    }).catch(function(err) {
      console.log(err);
    });
  };

}]);
