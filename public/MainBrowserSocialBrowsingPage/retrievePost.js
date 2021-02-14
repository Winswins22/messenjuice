// This scripts retrieves the information from createPost.js
// for use in mainPage.html

// NOTE: Time doesnt work. "Uncaught TypeError: timeElement is null"

/////////////////////////////////////////////////////
/*
   Variables + Constants
*/
/////////////////////////////////////////////////////

let myStorage = window.sessionStorage;

let post_area = document.getElementById("newPost");

let titleDiv = document.createElement("div");
let textboxDiv = document.createElement("div");

let titleData = myStorage.getItem('title');
let textboxData = myStorage.getItem('textbox');

let timeElement = document.getElementById("postedTimeUnique");

/////////////////////////////////////////////////////
/*
   Functions for getting time
*/
/////////////////////////////////////////////////////

// Formats time into a readable format
function formatTime(hours, minutes){

    let AM_or_PM = "";

    if (hours > 12){
        AM_or_PM = "PM";
        hours = hours - 12;
    }
    else if (hours == 12){
        AM_or_PM = "PM";
    }
    else{
        AM_or_PM = "AM";
    }

    let formattedTime = hours + ":" + minutes + AM_or_PM;

    return formattedTime;

}

// Retrieves the time in an easy way
function getTime(){

    let currentDate = new Date();
    let currentTime = formatTime(currentDate.getHours(),  + currentDate.getMinutes());

    console.log(currentTime);
    return currentTime;
    
}

/////////////////////////////////////////////////////
/*
   Functions for Session Storage manipulation
*/
/////////////////////////////////////////////////////

function isData(){

    if (myStorage.getItem('title') == null || textboxData == null){
        console.log("No data detected.");
        return false;
    }
    return true;

}

// Gets the contents of title and textbox and reads them
// into titleDiv and textboxDiv
function readData(){

    console.log("Got data!:");
    console.log("titleData: ", titleData);
    console.log("textboxData: ", textboxData);

    titleDiv.innerHTML = titleData;
    textboxDiv.innerHTML = textboxData;

    // Reset the data.
    myStorage.removeItem('title');
    myStorage.removeItem('textbox');

}

/////////////////////////////////////////////////////
/*
   Functions for adding elements to the page
*/
/////////////////////////////////////////////////////

// Adds CSS elements to the divs and posts it
function createPost(){

    // Add CSS
    titleDiv.classList.add("postTitle");
    textboxDiv.classList.add('postContent');

    // Post divs
    post_area.appendChild(titleDiv);
    post_area.appendChild(textboxDiv);

    // Change current time
    timeElement.innerHTML = getTime();

}

/////////////////////////////////////////////////////
/*
   Run the code
*/
/////////////////////////////////////////////////////

timeElement.innerHTML = getTime();

if (isData()){
    readData();
    createPost();
}