// GLOBAL VARIABLES and Function for Weather
// ---------------------------------------------------------------
var outputDiv;
var outputDivTraffic;

function getWeather(zipcode) {
	// Make Ajax calls and update page
  console.log("Making ajax call with " + zipcode);
}






// Google API (Sonja)
// ---------------------------------------------------------------

$(document).ready(function() {

   
    
  //set up ability to pick time from a list of options
  $("#departure-input").timepicker(); 
  
    
  
  
  var input = document.getElementById('origin');


$("#submit").on("click", function(){
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


        function  getDistances(origin1, destinationA,cb) {
        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          drivingOptions: {
            departureTime: new Date(2019, 02, 14, 7, 0, 0, 0),// need user to choose a date and time - find a date picker
            trafficModel: 'pessimistic'
          },
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          console.log(response);
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            outputDivTraffic = document.getElementById('results-traffic');
            outputDiv = document.getElementById('results');            

          
        
            //check for zipcode and save to a variable
            var addressArr = destinationList.toString().split(',');
            // Julie, you can call your weather function using the zipcode[0].
            zipcode = addressArr[2].match(/\d+/);
            getWeather(zipcode[0]);
           

            outputDiv.innerHTML = '';
            outputDivTraffic.innerHTML = '';

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                
                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';
                
                outputDivTraffic.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration_in_traffic.text + '<br>';
                
                 
              }
            }
            }
        });
      // }
        }
  




// Weather API (Julie)
// ---------------------------------------------------------------






// Life Tasks user input (Tammy)
// ---------------------------------------------------------------





// Calculate wake up time (Tammy)
// ---------------------------------------------------------------
