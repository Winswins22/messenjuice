// login button pressed
document.getElementById("button").addEventListener('click', async event=>{
    // get username and password
    let username_email = document.getElementById("username_email").value;
    let password = document.getElementById("password").value;

    let data = {username_email,password};
    console.log(username_email,password);
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // request data
    async function getData(){
        const response = await fetch('/getUserInfo');
        const json = await response.json();
        return json;
    }

    // check username and password
    getData().then(json=>{
        checkloginInfo(json);
    })

    // check username and password
    function checkloginInfo(json){
        console.log(json);
        if (Object.keys(json).length == 0){
            console.log("Username or password is incorrect! Please try again.");
            return;
        }

        for (user of json){
            if ((username_email === user.username || username_email === user.email) && password === user.password){
                // login success
                console.log("login success");
                return;
            }
        }
        console.log("Username or password is incorrect! Please try again.");
        return;
    }
});