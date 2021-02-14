/////////////////////////////////////////////////////
/*
   Constants + Variables
*/
/////////////////////////////////////////////////////

const send_button = document.getElementById("Send");
const message_box = document.getElementById("Textbox");

let message_area = document.getElementById("Messages");

let tempMessage;

let timeDiv;
let messageDiv;

let username1 = "sampleFriend1" // sample
let username2 = "sampleFriend2" // sample
let roomID = "room1" // sample

/////////////////////////////////////////////////////
/*
   Functions for retrieving info
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

    return currentTime;
    
}

/////////////////////////////////////////////////////
/*
   Functions for creation of text boxes
*/
/////////////////////////////////////////////////////

// Creates CSS elements to simulate if you sent a message
function createSentMessage (message){

    //console.log("Creating divs!");
    // console.log("Message: ", message);

    // Create and get information for time
    timeDiv = document.createElement("div");
    timeDiv.innerHTML = getTime();

    // Create and get information for message
    messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;

    // Add time and message to the page
    message_area.appendChild(messageDiv);
    message_area.appendChild(timeDiv);

    // Add time and message classes
    timeDiv.classList.add("timeRight");
    messageDiv.classList.add('theirMessage');

}

// Creates CSS elements to simulate if you recieved a messaged from someone else
function createReceivedMessage(message){

    //console.log("Creating divs!");
    // console.log("Message: ", message);

    // Create and get information for time
    timeDiv = document.createElement("div");
    timeDiv.innerHTML = getTime();

    // Create and get information for message
    messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;

    // Add time and message to the page
    message_area.appendChild(messageDiv);
    message_area.appendChild(timeDiv);

    // Add time and message classes
    timeDiv.classList.add("timeLeft");
    messageDiv.classList.add('myMessage');

}

/////////////////////////////////////////////////////
/*
   Functions for sending messages
*/
/////////////////////////////////////////////////////

// Checks if textbox is empty when "Send" button is clicked.
// Sends the message after.
function sendWithClick(){

    // Check if message is valid
    if (message_box.value != ""){

        // Log + Send the message
        console.log("Sending message via click: ", message_box.value);

        // Log + Send the time
        // console.log("Current Time:", getTime());

        // save Messages
        saveData(message_box);

        // Reset the textbox's value
        message_box.value = "";

    }
    else{
        console.log("Clicked send, but no input");
    }

}

// Checks if key pressed is "Enter" whenever something is typed into the textbox
// After that, it checks if the textbox is empty before sending.
function sendWithEnter(character){

    //checks whether the pressed key is "Enter"
    if (character.key == "Enter") {  

        // Check if message is valid
        if (message_box.value != ""){

            // Log + Send the message
            console.log("Sending message via enter: ", message_box.value);

            // Log + Send the time
            // console.log("Current Time:", getTime());
            
            // save Messages
            saveData(message_box);

            // Reset the textbox's value
            message_box.value = "";

        }
        else{
            console.log("Enter pressed, but no input");
        }

    }

}


/////////////////////////////////////////////////////
/*
   Listeners for activating functions
*/
/////////////////////////////////////////////////////

// Send when clicked
send_button.addEventListener("click", function(){

    tempMessage = message_box.value;
    //console.log(tempMessage)

    sendWithClick();
    createSentMessage(tempMessage);

    //console.log(tempMessage);

});

// Send when enter pressed
message_box.addEventListener("keydown", function(character){

    tempMessage = message_box.value;
    //console.log(tempMessage)

    sendWithEnter(character);

    if (character.key == "Enter"){
        createSentMessage(tempMessage);
        //console.log(tempMessage);
    }

});

/////////////////////////////////////////////////////
/*
   saving messages
*/
/////////////////////////////////////////////////////

async function saveData(message_box){
    // save data

    console.log(message_box.value);
    let message = {
        chat:[username1,username2],
        roomID: roomID,  // USING SAMPLE ID
        _message : {
            txt: message_box.value,
            author: username1, // USING SAMPLE USERNAME
            time:getTime(),
        }
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    console.log(message);
    // save data and get status
    console.log("saving...");
    const response = await fetch(`/saveMessages`,options);
    const json = await response.json();
    console.log(json);

    // log status
    if (json.status === 'success'){
        console.log("messages saved successful");
    }else{
        console.log("messages saved failed");
    }
}
/////////////////////////////////////////////////////
/*
   loading messages
*/
/////////////////////////////////////////////////////
async function loadMessages(){

    const data = {
        chatRoomID:roomID,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/loadMessages', options);
    const json = await response.json();

    console.log(json);
    for (messages of json.messages) {
        console.log(messages);
        // create message
        if (messages.author === username1){
            createSentMessage(messages.txt);
        }
        else if (messages.author === username2){
            createReceivedMessage(messages.txt);
        }
    }
}

loadMessages();