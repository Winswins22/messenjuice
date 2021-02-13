let button = document.getElementById("CreateElement");
let newElem;
let elementsList = [];

// Create new element when button is pressed
button.addEventListener("click", function(){

    newElem = document.createElement("input");

    document.body.appendChild(newElem);
    newElem.placeholder = "Wow, hello!";

    init(newElem);

    elementsList.push(newElem);

    // Log element properties
    //console.dir(newElem);

    // Log list
    // console.log(elementsList);

});


// Send when enter pressed
function init(newElement){

    newElement.addEventListener("keydown", function(character){

        //checks whether the pressed key is "Enter"
        if (character.key == "Enter") {  
    
            // Check if message is valid
            if (newElement.value != ""){
    
                // Log + Send the message
                console.log("Sending message via enter: ", newElement.value);
                
                // Reset the textbox's value
                newElement.value = "";
    
            }
            else{
                console.log("Enter pressed, but no input");
            }
    
        }
    
    })
}