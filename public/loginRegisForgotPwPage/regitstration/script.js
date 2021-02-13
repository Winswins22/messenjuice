// login button pressed
document.getElementById("button").addEventListener('click', async event=>{
    // get username and password
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    const confirmPassword = document.getElementById("confirmPassword");

    function checkPassword(){
        if (confirmPassword == password) {
            // password is valid
            console.log("password is valid");
        }else{
            console.log("password is invalid");
        }
    }
    const data = {
        username: username,
        password: password,
        email: email,
    }
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // request username and password check and
    // request create account
    const response = await fetch('/regitstration', options);
    const json = await response.json();
    console.log(json);
});