let lat;
let long;

function getLocation (){
    
    if('geolocation' in navigator) {

    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {

        lat = position.coords.latitude;
        long = position.coords.longitude;

        console.log (lat);
        console.log (long);

    });

  } else {
    /* geolocation IS NOT available */
  }
  
}

function createMap(){

    // Change when ready
    // lat == 51.505
    // long == -0.09
    // zoom_level == 13
    let mymap = L.map('map').setView([51.505, -0.09], 13);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);

}

getLocation();
createMap();