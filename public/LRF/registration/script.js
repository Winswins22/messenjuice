// login button pressed
document.getElementById("button").addEventListener('click', async event=>{
    // get username and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

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

    if (confirmPassword === password) {
        // password is valid
        console.log("password is valid");
        // request username and password check and
        // request create account
        const response = await fetch('/regitstration', options);
        const json = await response.json();
        console.log(json);
    }else{
        console.log("password is invalid");
    }
});