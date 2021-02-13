const send_button = document.getElementById("Send");
const message_box = document.getElementById("Textbox");

// Send when clicked
send_button.addEventListener("click", function(){

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


});

// Send when enter pressed
message_box.addEventListener("keydown", function(character){

    //checks whether the pressed key is "Enter"
    if (character.keyCode == 13) {  

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


})