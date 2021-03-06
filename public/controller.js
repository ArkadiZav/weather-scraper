var app = angular.module('weather', ['ngAutocomplete']);
app.controller('weather-controller', ['$scope','$http', function($scope, $http) {

  $scope.cities = [];
  $scope.showOrHideViews = {
    cities_data: false,
    spinner: false,
    error: null
  };

  function RemoveCountriesStrFromLocation(full_input) { // NOTE: helper function
    var result = full_input;
    var indexOfFirstComma = full_input.indexOf(",");
    if (indexOfFirstComma > 0) { // Comma exists
      var result = full_input.substring(0, indexOfFirstComma);
    }
    console.log("shoretned searched value from: " + full_input + " to: " + result);
    return result;
  }
  $scope.handleSearch = function() {
    $scope.showOrHideViews.spinner = true;
    $scope.error = null;
    $http.get('http://localhost:8080/get_weather/' + RemoveCountriesStrFromLocation($scope.weather_location))
    .then(function(weather) {
      $scope.showOrHideViews.cities_data = true;
      $scope.showOrHideViews.spinner = false;
      $scope.weather_location = ""; // NOTE: reset input value
      $scope.cities.push(weather.data);
    }).catch(function(err) {
      $scope.showOrHideViews.spinner = false;
      $scope.error = "an error has occured performing the search. Please try again";
      console.log(err);
    });
  };

}]);
