/////////////////////////////////////////////////////
/*
   Variables and Constants
*/
/////////////////////////////////////////////////////

let clickedAlready = false;

let locationData = {
};

let myStorage = window.sessionStorage;
let mapButton = document.getElementById("map_button");

let timeDiv2 = document.createElement("div");
let msgDiv = document.createElement("div");

/////////////////////////////////////////////////////
/*
   Functions for sending messages
*/
/////////////////////////////////////////////////////

function sendHyperlinkMapMessage(){

    // Create and get information for time
    timeDiv2 = document.createElement("div");
    timeDiv2.innerHTML = getTime();

    // Create and get information for message
    msgDiv = document.createElement("div");
    msgDiv.innerHTML = "Click the map button to view map.";

    // Add time and message to the page
    message_area.appendChild(msgDiv);
    message_area.appendChild(timeDiv2);

    // Add time and message classes
    timeDiv2.classList.add("timeRight");
    msgDiv.classList.add('theirMessage');

}

/////////////////////////////////////////////////////
/*
   Functions for getting locations
*/
/////////////////////////////////////////////////////

// Gets the location and reads it into a variable called locationData
function getLocation (){

    //console.log("Sending location request");

    navigator.geolocation.getCurrentPosition((position) => {
        
        //console.log("Location request response: Allowed");

        let lat;
        let long;

        lat = position.coords.latitude;
        long = position.coords.longitude;

        /*
        // Error handling
        if (lat == undefined || long == undefined){
            lat = 43.8217858;
            long = 43.8217858;
        }
        */

        //console.log (lat);
        //console.log (long);

        locationData = {
            lat: lat,
            long: long
        };

        saveLocationData();
        sendHyperlinkMapMessage();

    });
  
}

/////////////////////////////////////////////////////
/*
   Functions for manipulating Session Storage
*/
/////////////////////////////////////////////////////

function saveLocationData(){

    //locationData.lat = 43.8217858;
    //locationData.long = -79.3090951;

    myStorage.setItem('latitude', locationData.lat);
    myStorage.setItem('longitude', locationData.long);

    console.log(locationData.lat, locationData.long);
    console.log(myStorage.getItem('latitude'), myStorage.getItem('longitude'))
}

/////////////////////////////////////////////////////
/*
   Listeners for activating functions
*/
/////////////////////////////////////////////////////

mapButton.addEventListener("click", function(){

    if (clickedAlready == false){

        getLocation();

        clickedAlready = true;

    }
    else{

        window.location = "mapPage.html";

    }

});