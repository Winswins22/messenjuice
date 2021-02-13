let newElem = document.createElement("input");

document.body.appendChild(newElem);
newElem.placeholder = "Wow, hello!";

console.dir(newElem);

// Send when enter pressed
newElem.addEventListener("keydown", function(character){

    //checks whether the pressed key is "Enter"
    if (character.key == "Enter") {  

        // Check if message is valid
        if (newElem.value != ""){

            // Log + Send the message
            console.log("Sending message via enter: ", newElem.value);
            
            // Reset the textbox's value
            newElem.value = "";

        }
        else{
            console.log("Enter pressed, but no input");
        }

    }


})