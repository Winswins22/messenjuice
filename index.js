const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const Datastore = require('nedb');
const dotenv = require('dotenv')
const fs = require('fs');
const nodemailer = require("nodemailer");

//load dotenv
dotenv.config()

// access database
const db = new Datastore("db/users.db");
// load data
db.loadDatabase();

// load app
const app = express()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening at port:',PORT));

app.use(express.static('public'));
app.use(express.json({limit:'10mb'}));

// route to home page
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "public/MainPageTemp/mainPage.html");
    // fs.createReadStream("public/MainPageTemp/mainPage.html").pipe(res);
})

/*
// data structure
using username and email as primary key

{
    username:string
    password:string
    email:string
}
*/

// get data info
app.get('/getDataInfo', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
})

// ---------------regitstration-------------------
app.post('/regitstration', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;

    let obj = {};
    
    let res = 1;
    function register(){
        if (res){
            // user does not exist
            db.insert({
                    username:username,
                    password:password,
                    email:email
            })
            console.log("registration completed successfully")
    
            // return status
            obj = {status:"success"};
        }else{
            // user exists
            console.log("user already exists");
    
            // return status
            obj = {status : "failed"};
        }
    }

    db.find({}, (err, data) => {
        // error has occur
        if (err) {
            response.end();
            res = 0;
        }
        // data is undefined
        if(data == undefined) {
            res = 1;
        }
        if (Object.keys(data).length == 0){ 
            res = 1;
        }
        for (user of data) {
            if (user.username === username || user.email === email){
                // user already exists
                res = 0;
            }
        }
        register(data);
        // sent obj back to the request
        response.json(obj);
    })
})


// ---------------Forgot Password-------------------
app.post("/send-email",(req, res) => {
    const email = req.body.email;
    const path = req.body.path;
    let obj = {}

    function sentEmail(email){
        // get info from dotenv
        EMAIL = process.env.GMAIL;
        PASSWORD = process.env.PASSWORD;

        // create transportation for sender
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: EMAIL,
                pass: PASSWORD

            }
        });

        // create reset html path
        const dirPath = path + '/resetPassword.html';
        
        // email info
        var mailOptions = {
            from: "messenjuice <no-reply@hackathon.com>",
            to: email,
            suject: "Reset Password",
            text:"test",
            html: 
            "<p>You have requested a password reset. Click this link to continue</p>" + 
            "<a href =\" " + dirPath + " \">Reset Password</a>"
        };

        // send email
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err) {
                console.log(err);
                obj = {status:"failed"};
            }else{
                console.log("email sent: ", info.response);
                obj = {status:"success"};
            }
        });
    }
    sentEmail(email);
    res.json(obj);
})

// ---------------reset password-------------------

app.post("/resetPassword", (req, res)=>{
    const newPassword = req.body.password;
    const email = req.body.email;
    let returnValue = {}

    // search data for username
    async function update(){

        // search data for email
        await db.update( {email:email}, {$set: {password:newPassword}},{},(err,numReplace) =>{
            if (err){
                console.log(err);
                returnValue = {status:"failed"};
            }

            console.log("password has been updated");
            console.log("number of lines updated: ", numReplace);
            
            returnValue = {status:"success"};
            res.json(returnValue);
            return;
        })
        return;
    }
    update()
})  