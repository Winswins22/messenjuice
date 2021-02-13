/////////////////////////////////////////////////////
/*
   Constants + Variables
*/
/////////////////////////////////////////////////////

const send_button = document.getElementById("Send");
const message_box = document.getElementById("Textbox");

/////////////////////////////////////////////////////
/*
   Functions for creation of text boxes
*/
/////////////////////////////////////////////////////

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
send_button.addEventListener("click", sendWithClick())

// Send when enter pressed
message_box.addEventListener("keydown", sendWithEnter(character));
