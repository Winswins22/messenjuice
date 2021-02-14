// const send_button = document.getElementById("Send");
const url_button = document.getElementById("URL_Shortener");
// const text_box = document.getElementById("Send");

url_button.addEventListener("click", function(){

    //console.log("Trying to shorten link: ", message_box.value);

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
            "url": message_box.value
        }
    };
    
    $.ajax(settings).done(function (response) {

        //console.log("Clicked!");
        //console.log(response);

        message_box.value = response.result_url;

    });

});