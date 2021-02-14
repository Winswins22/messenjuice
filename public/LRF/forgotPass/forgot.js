// forgot password button pressed
document.getElementById("fogotpass").addEventListener('click', async event=>{
    // get username and password
    const email = document.getElementById("email").value;

    async function getData(){
        const response = await fetch("/getUserInfo");
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
            if (user.email == email){
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

                const response = await fetch('/send-email', options);
                const json = await response.json();
                
                if (json.status === 'success'){
                    console.log("Email sent successful");
        
                }else{
                    console.log("Email sent failed");
                }
            }
        }
        console.log("email does not exist! Please try again.");
    }

    getData().then(json=>{
        checkEmail(json);
    })
});