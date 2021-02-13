// reset passwordbutton pressed
document.getElementById("resetbutton").addEventListener('click', async event=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    console.log(password,confirmPassword);
    if (password === confirmPassword){
        const data = {
            email: email,
            password:password
        }

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('/resetPassword', options);
        const json = await response.json();

        if (json.status === 'success'){
            console.log("password reset successful");

        }else{
            console.log("password reset failed");
        }
    }else{
        console.log("password does not match");
    }
});