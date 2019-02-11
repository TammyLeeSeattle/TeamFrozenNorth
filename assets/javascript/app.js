// GLOBAL VARIABLES and Function for Weather
// ---------------------------------------------------------------
var outputDiv;
var outputDivTraffic;

function getWeather(zipcode) {
  // Make Ajax calls and update page
  console.log("Making ajax call with " + zipcode);
}

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

  // TAMMY: global variable to store all data inputs that engage with firebase
  var lifeTasksData = firebase.database();

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
            localStorage.setItem('weather-description', response.list[0].weather[0].main);
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

    //storing and retrieving new directions data
    var origin = $("#origin-input").val().trim();
    var destination = $("#destination-input").val().trim();

    var departureTime = $("#departure-input").val().trim();
    console.log("Getting distances from " + origin + " to " + destination);

    // Validate origin, destination adn departureTime values
    if(origin.length ===0 || destination.length ===0 || departureTime.length ===0){
    
      return;
    }

    getDistances(origin, destination);
  });
});

var service; //what is this for?
function setupDirections() {

// function setupDirections() {

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
      getWeather(zipcode[0]);


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
      // redirect to calculate page

    }
  });
  // }
}

function mapsResults() {
  $('#results-traffic').text(localStorage.getItem('results-traffic'));

  $('#results').text(localStorage.getItem("results"));
}

// Ben made the destination address show up on the calculate page
// Capture Button Click
$("#submit").on("click", function (event) {
  // prevent page from refreshing when form tries to submit itself
  event.preventDefault();

  // Capture user inputs and store them into variables
  var destination = $("#destination-input").val().trim();


  // Console log each of the user inputs to confirm we are receiving them
  console.log(destination);

  // Replaces the content in the "recent-member" div with the new info
  $("#designated-destination").text(destination);

  // Clear localStorage
  localStorage.clear();

  //save destination info to local storage for later reference
  localStorage.setItem("destination", destination);

});

// By default display the content from localStorage
$("#designated-destination").text(localStorage.getItem("destination"));
// >>>>>>> Stashed changes

  service = new google.maps.DistanceMatrixService;

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  //var travelModeArr =  //this needs to be a picker from a list of options
  if (originInput) {
    autocomplete = new google.maps.places.Autocomplete(originInput, {});
    autocomplete = new google.maps.places.Autocomplete(destinationInput, {});
  }
;

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


// TAMMY: Store user inputs from calculate.html in firebased
// ---------------------------------------------------------------

// send data to firebase on click of submit by collecting inputs from each field and storing it
$("#addTask ").on("click", function () {
  
  // on user click of "Add Activity", create a new task item that will be stored in firebase
  var newTask = {
    name: $("#taskName").val(),
    taskTime: $("#taskDuration").val()
  }

  // add user input and commit to firebase variable
  lifeTasksData.ref().push(newTask);

  // update HTML with the latest user input
  $("#taskName").val("");
  $("#taskDuration").val("");

  // prevents reload of page based on submit button
  return false;
})

// start 'time counter' for number of minutes associated with user inputs (weather + activities)
var taskMinutes = 0;

// calculate anticipated arrival time by adding "extra time" (weather + activites) to traffic time to desired departure time
var hardCodedDepartDateString = "2019-02-14T"; // this is the hard-coded date. THIS WILL NEED TO CHANGE IF WE UN-HARDCODE THE DATE OF DEPARTURE.

var desiredDepartureTime = localStorage.getItem("departure");

// use MomentJS to add and format some time to show user info on index.html. Use 'replace' to remove the 'min' notation from "results-traffic". SHOULD UPDATE THIS ID IN THE FUTURE TO AVOID USE OF 'REPLACE' HERE.
var anticipatedArrivalTime = moment(hardCodedDepartDateString + desiredDepartureTime).add(localStorage.getItem('results-traffic').replace(' mins', ''), 'minutes');

    // //testing and debugging -- Tammy
    // console.log(localStorage.getItem("departure"));
    // console.log(anticipatedArrivalTime);

// retrieve data from firebase
lifeTasksData.ref().on("child_added", function (snapshot) {
  var name = snapshot.val().name;
  var taskTime = snapshot.val().taskTime;

      // // testing and debugging -- Tammy
      // console.log(name);
      // console.log(taskTime);

  // create a running sum of minutes ("taskMinutes") and as user adds activities/weather, then add "taskTime" to the sum of minutes
  taskMinutes =parseInt(taskMinutes) + parseInt(taskTime);

      // // testing and debugging -- Tammy
      // console.log(taskMinutes);

      // allowing for the final "anticipatedArrival" to be relevant outside of this event listener function
      anticipatedArrivalTime = anticipatedArrivalTime.add(parseInt(taskTime), 'minutes');

      // update DOM for "anticipated arrival time"
      $("#anticipatedArrivalTime").text(anticipatedArrivalTime.format('MMMM DD - LT'));

  // update HTML on calculate.HTML to show data retrieved from firebase to make the activity list dynamically visible
  var div = $('<div />')
    .attr('class', 'task alert alert-dark')
    .attr('data-time', taskTime)
    .text(name);

  // prevent 'weather' task from showing in the activity item list; otherwise, user sees an activity called "weather" in their activity list. Show all other user activities on the page.  
  if (name !== 'weather') {
      $("#alert-activities").append(div);
  }

  // update DOM to show sum of weather + activities time
  $("#extraTimeNeeded").text(taskMinutes);
});


// collect all user input values, store in firebase, then retrieve the minutes from weather + duration from firebase, then redirect to /result.html on click of "calculate"
$('#calculate').on("click", function () {

  // convert user input of additional time due to weather to a number
  var weatherVariable = {
      name: "weather",
      taskTime: $("#how-much").val()
    }
  
    // add user input for additional weather time and commit to firebase
    lifeTasksData.ref().push(weatherVariable);
})