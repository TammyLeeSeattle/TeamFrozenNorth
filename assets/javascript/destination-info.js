 // Capture Button Click
 $("#submit").on("click", function (event) {
     // prevent page from refreshing when form tries to submit itself
     event.preventDefault();

     // Capture user inputs and store them into variables
     var destination = $("#destination-input").val().trim();
     var departure = $("#departure-input").val().trim();

     // Console log each of the user inputs to confirm we are receiving them
     console.log(destination);
     console.log(departure);

     // Replaces the content in the "recent-member" div with the new info
     $("#designated-destination").text(destination);
     $("#weather-response").text(departure);


     // Clear localStorage
     localStorage.clear();


     //save destination info to local storage for later reference
     localStorage.setItem("destination", destination);
     localStorage.setItem("departure", departure);

 });


 // By default display the content from localStorage
 $("#designated-destination").text(localStorage.getItem("destination"));
 $("#weather-response").text(localStorage.getItem("departure"));