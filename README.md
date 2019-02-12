Deployed at: https://tammyleeseattle.github.io/TeamFrozenNorth/pages/index_1.html

* What problem does your app focus on>
For busy folks who SUPER hate getting up early only to have that weird 15 minutes of time because they got up too early (and realize they could've slept in 15 minutes more)... then, let this program calculate your life variables, weather variables, a buffer zone, and anticipated traffic times to decide when to wake you up!
Alternatively, maybe you want to maximize your nap time... this app should be able to figure out your maximum nap time.

* How does your app solve this problem at a high-level>

We built an application that is able to take three major inputs (commute, weather and tasks.

Step 1) Estimate commute - get traffic data-using google maps API (distance matrix weather data)
Step 2) Check weather at destination to add a buffer to calculated commute time - call the Open Weather API using the zipcode of the destination address returned from the google maps API.  
Step 3) Enter user Tasks - Add a To-do list choose tasks from a list of options provided fixed options via buttons and the user will have the option to add and personalize tasks


* Technologies we used to build the app>

HTML, CSS, Bootstrap, timepickers 
Google Maps, distance matrix API
Open weather maps API
Firebase
Moment.js


* Show the app running and solving the problem that began your story. 
    (insert picture of landing page)


* Features to be added in future releases>
- Add a local alarm based on the results of the calculation
- Add a "to do" list based on the tasks that were entered during the alarm calculation.  The list will appear when the user is woken up by alarm?
- User input of estimated time requirements for life variables (e.g., getting kids ready, making lunch/breakfast, etc.) OR.. if in nap-mode, user input of estimated auxiliary time requirements.
- User input of additional/no time to account for weather variations (e.g., "Add 10 more minutes if it's raining when I wake up.")
- Time Zones
- "Snooze" function and associated, "check later" routes
- Considerations about notification settings on phone, geolocation tracking, etc.
- "Soft wake up", where sound and light gradually increase on phone
- Alarm turn-off via home screen notification
------------------------------------------

Contributors >
SonjaRasmussen
benvaagen
TammyLeeSeattle
JulieMathews

