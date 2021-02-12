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

  return new Promise(function (resolve, reject) {
    resolve("Hello World!")
  })
  
}

let a = 1 + 1;

let promise = new Promise(function (resolve, reject){  

    if (a == 2){
        resolve("Success")
    }
    else {
        reject("Failed");
    }

});

promise.then(function(message){
    console.log(message);
});