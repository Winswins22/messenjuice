// Not hooked up yet

if('geolocation' in navigator) {

    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {

        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        console.log (lat);
        console.log (long);

    });

  } else {
    /* geolocation IS NOT available */
  }
  