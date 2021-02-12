// login button pressed
document.getElementById("button").addEventListener('click', async event=>{
    // get username and password
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let data = {username,password};
    console.log(username,password);
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    // request username and password check
    const response = await fetch('/loginINFO', options);
    const json = await response.json();
    // console.log result
    console.log(json);
});