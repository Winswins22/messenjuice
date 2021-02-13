// Spaghetti warning

let data = {
}

// Gets the location, then calls createMap()
function getLocation (){

    //console.log("Sending location request");

    navigator.geolocation.getCurrentPosition((position) => {
        
        //console.log("Location request response: Allowed");

        let lat;
        let long;

        lat = position.coords.latitude;
        long = position.coords.longitude;

        //console.log (lat);
        //console.log (long);

        data = {
            lat: lat,
            long: long
        };

        createMap()

    });
  
}

// creates the map after getLocation() gets location data
function createMap(){

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

getLocation();