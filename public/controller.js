var currentCity;
var userCities = [];
var currentDate = new Date();

function convert(data) {
   return Math.round(data - 273.15);
}

function fetch(currentCity) {
    $.get({
        url: 'http://localhost:8080/get_weather/' + currentCity,
        success: function(data) {
            //update the userData using API data
            console.log(data);
            // var city = {
            //     name: data.name,
            //     temp: data.main,
            //     currentCel:convert(data.main.temp),
            //     currentFar:Math.round((data.main.temp-273.15)*1.8+32),
            //     minTempC:Math.round(data.main.temp_min-273.15),
            //     maxTempC:Math.round(data.main.temp_max-273.15),
            //     minTempF:Math.round((data.main.temp_min-273.15)*1.8+32),
            //     maxTempF:Math.round((data.main.temp_max-273.15)*1.8+32),
            //     description:data.weather,
            //     sys:data.sys,
            //     comments:[],
            //     date:currentDate.getDate()
            // }
            // userCities.push(city);
            // _renderCityTemps(userCities);
        },
        error: function (err) {
          console.log(err);
        }
    });
}

function grabUserData() {
  currentCity = $("#userInput").val();
  $("#userInput").val('');
}

$("#search").on('click', function () {
    grabUserData();
    fetch(currentCity);
})

var userinput = document.getElementById("userInput");
var autocomplete = new google.maps.places.Autocomplete(userinput);
