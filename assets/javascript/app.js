// GLOBAL VARIABLES
// ---------------------------------------------------------------






// Google API (Sonja)
// ---------------------------------------------------------------

$(document).ready(function() {

    var zipcode = "";  //this need to be global so that the weathe app can access it
    // var travelModeArr = [DRIVING, WALKING, TRANSIT, BICYCLE];
    
    //set up ability to pick time from a list of options
    $("#departure-input").timepicker(); 
    $("#arrival-input").timepicker();   
      
    
    //?
    var input = document.getElementById('origin');
    
    $("#submit").on("click", function(){
        event.preventDefault();
    
        //storing and retreiving new directions data
              var origin = $("#origin-input").val().trim();
              var destination = $("#destination-input").val().trim();
            //   var transportation = $("transportation-input").val().trim();
            //   var arrivalTime = $('#arrival-input').val().trim();
              var departureTime = $("#departure-input").val().trim();
              console.log("Getting distances from " + origin + " to " + destination); // + "travel mode" + travelModes);
              
              
              getDistances(origin, destination);
        });
    });
    
          var service; //what is this for?
    
            function setupDirections() {
              
                service = new google.maps.DistanceMatrixService;
              
                var originInput = document.getElementById('origin-input');
                var destinationInput = document.getElementById('destination-input');
                // var travelModeArr =  //this needs to be a picker from a list of options
                autocomplete = new google.maps.places.Autocomplete(originInput, {});
                autocomplete = new google.maps.places.Autocomplete(destinationInput, {});
              }
    
    
            function getDistances(origin1, destinationA) {
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
                var outputDivTraffic = document.getElementById('results-traffic');
                var outputDiv = document.getElementById('results');            
    
              
            
            //check for zipcode and save to a variable
            var addressArr = destinationList.toString().split(',');
            // Julie, you can call your weather function using the zipcode[0].
            var zipcode = addressArr[2].match(/\d+/);
            console.log(zipcode[0]);
    
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
