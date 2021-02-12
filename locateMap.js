// Spaghetti warning

let data = {
}

// Gets the location, then calls createMap()
function getLocation (){

    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {
        
        console.log("Inside geolocator!");

        let lat;
        let long;

        lat = position.coords.latitude;
        long = position.coords.longitude;

        console.log (lat);
        console.log (long);

        data = {
            lat: lat,
            long: long
        };

        createMap()

    });
  
}

// creates the map after getLocation() gets location data
function createMap(){

    let mymap = L.map('map').setView([data.lat, data.long], 13);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);

}

getLocation();