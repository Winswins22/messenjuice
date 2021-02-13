document.getElementById("button").addEventListener('click', async event =>{
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const data = {
        username: username,
        password: password,
        email: email,
        confirmPassword: confirmPassword
    };

    const options = {
        method :'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/regitstration',options);
});