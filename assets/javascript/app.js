// GLOBAL VARIABLES and Function for Weather
// ---------------------------------------------------------------
var outputDiv;
var outputDivTraffic;


  // TAMMY: config file to initialize Firebase
  var config = {
    apiKey: "AIzaSyDVg7BCMfMiHyKtxl_3uQ4oOQ1g7yO8cIo",
    authDomain: "rise-and-shine-766d0.firebaseapp.com",
    databaseURL: "https://rise-and-shine-766d0.firebaseio.com",
    projectId: "rise-and-shine-766d0",
    storageBucket: "rise-and-shine-766d0.appspot.com",
    messagingSenderId: "1074221528291"
  };

  // TAMMY: call firebase
  firebase.initializeApp(config);

  // call weather function
  function getWeather(zipcode, callback) {
    // Make Ajax calls and update page
    console.log("Making ajax call with " + zipcode);
    var zipQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + ",us&appid=a0860c281528ff7d7dd56080be3e0004";
    $.ajax({                
        url: zipQueryUrl,
        method: "GET",
        dataType: 'json',
        success: function(response){
            console.log(response); 
            localStorage.setItem('weather-description', response.list[0].weather[0].description);
            callback();
        }
    });
  }


// Google API (Sonja)
// ---------------------------------------------------------------

$(document).ready(function () {



  //set up ability to pick time from a list of options
  $("#departure-input").timepicker();



  var input = document.getElementById('origin');


  $("#submit").on("click", function () {
    event.preventDefault();

    //storing and retreiving new directions data
    var origin = $("#origin-input").val().trim();
    var destination = $("#destination-input").val().trim();

    var departureTime = $("#departure-input").val().trim();
    console.log("Getting distances from " + origin + " to " + destination);

    getDistances(origin, destination)
  });
});

var service; //what is this for?

function setupDirections() {

  service = new google.maps.DistanceMatrixService;

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  //var travelModeArr =  //this needs to be a picker from a list of options
  autocomplete = new google.maps.places.Autocomplete(originInput, {});
  autocomplete = new google.maps.places.Autocomplete(destinationInput, {});
}


function getDistances(origin1, destinationA, cb) {
  service.getDistanceMatrix({
    origins: [origin1],
    destinations: [destinationA],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    drivingOptions: {
      departureTime: new Date(2019, 02, 14, 7, 0, 0, 0), // need user to choose a date and time - find a date picker
      trafficModel: 'pessimistic'
    },
    avoidHighways: false,
    avoidTolls: false
  }, function (response, status) {
    console.log(response);
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDivTraffic = "";
      var outputDiv = "";



      //check for zipcode and save to a variable
      var addressArr = destinationList.toString().split(',');
      // Julie, you can call your weather function using the zipcode[0].
      zipcode = addressArr[2].match(/\d+/);
      getWeather(zipcode[0], function () {
      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          outputDiv += results[j].duration.text;
          outputDivTraffic += results[j].duration_in_traffic.text;
        }
      }
      localStorage.setItem('results-traffic', outputDivTraffic);
      localStorage.setItem('results', outputDiv);
      location.href = "calculate.html";
    });
    }
  });
}

// Weather API Julie
// ---------------------------------------------------------------


var string = (localStorage.getItem("weather-description"));
var firstLetter = string.charAt(0);
var uppercaseFirstLetter = string.charAt(0).toUpperCase();
var stringWithoutFirstLetter = string.slice(1)

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapsResults() {
  $('#results-traffic').text(localStorage.getItem('results-traffic'));
  $('#results').text(localStorage.getItem("results"));
  $('#weather-forecast span').html(jsUcfirst(localStorage.getItem("weather-description")));
  var weatherIcon = getWeatherIcon(localStorage.getItem("weather-description"));
  $('#weather-forecast i').addClass(weatherIcon);
  // $('.temp').text('Temp: ' + Math.round(((response.list[0].main.temp - 273.15) * 1.80) + 32) + ' °F');
  // $('.city').html('<h1>' + response.city.name + ' Weather Details</h1>');
  // $('.weather').text('Weather: ' + response.list[0].weather[0].description);
}   

// take the description and use it to find in the weather icons to display the icon

function getWeatherIcon(felix){
  return 'wi-' + felix.toLowerCase();
 }


// Ben
// ---------------------------------------------------------------


// // By default display the content from localStorage
// $("#designated-destination").text(localStorage.getItem("destination"));



// Life Tasks user input (Tammy)
// ---------------------------------------------------------------





// Calculate wake up time (Tammy)
// ---------------------------------------------------------------