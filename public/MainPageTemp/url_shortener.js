// Not hooked up yet

/*
const url_button = document.getElementById("URL_Shortener");
const input_box = document.getElementById("input");

const output_title = document.getElementById("output_title");
const output_box = document.getElementById("output");
*/

url_button.addEventListener("click", function(){

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://url-shortener-service.p.rapidapi.com/shorten",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-key": "cd02a9ed79mshff3a60013782224p1953f5jsnefec32d50e5d",
            "x-rapidapi-host": "url-shortener-service.p.rapidapi.com"
        },
        "data": {
            "url": input_box.value
        }
    };
    
    $.ajax(settings).done(function (response) {

        console.log("Clicked!");
        console.log(response);

        output_title.innerHTML = "Shortened URL";
        output_box.innerHTML = response.result_url;

    });

});