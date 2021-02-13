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
    const username_email = document.getElementById("username_email").value;
    const password = document.getElementById("password").value;

    // request username and password
    async function getData(){
        const response = await fetch('/getDataInfo');
        const json = await response.json();
        return json;
    }

    // check username and password
    getData().then(json=>{
        checkloginInfo(json);
    })

    function checkloginInfo(json){
        console.log(json);
        if (Object.keys(json).length == 0){
            console.log("Username or password is incorrect! Please try again.");
            return;
        }
        for (user of json){
            if ((username_email == user.user.username || username_email == user.user.email) && password == user.user.password){
                // login success
                console.log("login success");
                return;
            }
        }
        console.log("Username or password is incorrect! Please try again.");
        return;
    }
});