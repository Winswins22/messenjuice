// reset passwordbutton pressed
document.getElementById("resetbutton").addEventListener('click', async event=>{
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (password === confirmPassword){
        const data = {
            password:password
        }

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        await fetch('/send-email', options);
        return;
    }else{
        console.log("password does not match");
    }
});