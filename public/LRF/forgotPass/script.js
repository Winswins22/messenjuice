// login button pressed
document.getElementById("button").addEventListener('click', async event=>{
    // get username and password
    const email = document.getElementById("email").value;

    async function getData(){
        const response = await fetch("/getDataInfo");
        const json = await response.json();
        return json;
    }

    const path = window.location.protocol + window.location.host + "/LRF/forgotPass";
    async function checkEmail(json){
        if (Object.keys(json).length == 0){
            console.log("email does not exist! Please try again.");
            return;
        }
        for (user of json) {
            if (user.user.email == email){
                console.log("email found");
                const data = {
                    email: email,
                    path:path
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
            }
        }
        console.log("email does not exist! Please try again.");
        return;
    }

    getData().then(json=>{
        checkEmail(json);
    })
});