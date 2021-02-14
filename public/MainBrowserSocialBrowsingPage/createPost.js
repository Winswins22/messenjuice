// This scripts saves the information inside createPost.html
// for later use in mainPage.html

/////////////////////////////////////////////////////
/*
   Variables + Constants
*/
/////////////////////////////////////////////////////

let myStorage = window.sessionStorage;

let title_box =  document.getElementById("title");
let message_box = document.getElementById("textbox");

let send_button = document.getElementById("Post");

/////////////////////////////////////////////////////
/*
   Functions for Session Storage manipulation
*/
/////////////////////////////////////////////////////

// Saves the contents of title and textbox
function saveData(){

   myStorage.setItem('title', title_box.value);
   myStorage.setItem('textbox', message_box.value);

}

/////////////////////////////////////////////////////
/*
   Listeners for activating functions
*/
/////////////////////////////////////////////////////

send_button.addEventListener("click", function(){

   saveData();

   // change html page to mainPage.html
   window.location.href = "mainPage.html";

});
