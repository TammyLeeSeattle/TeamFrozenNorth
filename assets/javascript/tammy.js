// ON PAGE LOAD
// --------------------------------------------------------------------

    // jQuery to make sure that things don't happen to the DOM until everything has loaded
    $( document ).ready(function() {
        console.log( "ready!" );
    });


// GLOBAL VARIABLES
// --------------------------------------------------------------------

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

  // TAMMY: reference to the firebase db
  var lifeTasksData = firebase.database();

// FUNCTIONS & OPERATIONS
// --------------------------------------------------------------------
// send data to firebase on click of submit by collecting inputs from each field and storing it
$("#addTask ").on("click", function () {
  
    // on user click of "Add Button", create a new task item in firebase
    var newTask = {
      name: $("#taskName").val(),
      taskTime: $("#taskDuration").val()
    }
  
    // add user input and commit to storage
    lifeTasksData.ref().push(newTask);
  
    // update HTML with new user input
    $("#taskName").val("");
    $("#taskDuration").val("");
  
    // prevents reload of page based on submit button
    return false;
  })

// start 'time counter' for number of minutes associated with user inputs
 var taskMinutes = 0;

  // collect data from firebase
  lifeTasksData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var taskTime = snapshot.val().taskTime;
  
    // running sum of minutes based on user input
    taskMinutes = taskMinutes + taskTime;

    // update HTML to show data retrieved from firebase
    var div = $('<div />')
      .attr('class', 'task alert alert-dark')
      .attr('data-time', taskTime)
      .text(name);
    if (name !== 'weather') {
        $("#alert-activities").append(div);
    }

  
  });
  
  // collect all user input values, store in firebase, then retrieve the minutes from weather + duration from firebase, then redirect to /result.html on click of "calculate"

  $('#calculate').on("click", function () {
    // on user click of "Add Button", create a new task item in firebase
    var weatherVariable = {
        name: "weather",
        taskTime: $("#how-much").val()
      }
    
      // add user input and commit to storage
      lifeTasksData.ref().push(weatherVariable);
    



  })