/////////////////////////////////////////////////////
/*
   Variables and Constants
*/
/////////////////////////////////////////////////////

let data = {
}

//let async = require("async");
let myStorage = window.sessionStorage;

/////////////////////////////////////////////////////
/*
   Functions for manipulating Session Storage
*/
/////////////////////////////////////////////////////

function getLocationData(){

    data = {
        lat: myStorage.getItem('latitude'),
        long: myStorage.getItem('longitude')
    };

    /*
    // Error handling
    if (data.lat == undefined || data.long == undefined){
        data.lat = 43.8217858;
        data.long = 43.8217858;
    }
    */

    //console.log(data);
}

/////////////////////////////////////////////////////
/*
   Functions for drawing the map
*/
/////////////////////////////////////////////////////

// creates the map after getLocation() gets location data
function createMap(){

    console.log(data.lat);

    /*
    // Error handling
    if (data.lat == undefined){
        data.lat = 43.8217858;
        data.long = 43.8217858;
    }
    */

    // Create map
    let mymap = L.map('map').setView([data.lat, data.long], 13);

    // Add attribution and data(tiles) to the map  ----------
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    // ------------------------------------------------------

    // Add marker at current location
    L.marker([data.lat, data.long]).addTo(mymap);

}

/////////////////////////////////////////////////////
/*
   Run the code
*/
/////////////////////////////////////////////////////

getLocationData();
createMap();