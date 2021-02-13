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
    fs.createReadStream("public/MainPageTemp/mainPage.html").pipe(res);
})

/*
// data structure
using username and email as primary key

users = {
    __Nuser__:string

    _userID_:{
        username:string
        password:string
        email:string
    }
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
                user:{
                    username:username,
                    password:password,
                    email:email,
                }
            })
            console.log("registration completed successfully")
    
            // return status
            obj = {status : "registration completed successfully"};
        }else{
            // user exists
            console.log("user already exists");
    
            // return status
            obj = {status : "username/email already exists"};
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
            if (user.user.username === username || user.user.email === email){
                // user already exists
                res = 0;
            }
        }
        register(data);
        response.json(obj);
    })
})


// ---------------Forgot Password-------------------
app.post("/send-email",(req,res) => {
    const email = req.body.email;

    function sentEmail(email){
        EMAIL = process.env.GMAIL;
        PASSWORD = process.env.PASSWORD;
        console.log(EMAIL,PASSWORD);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: EMAIL,
                pass: PASSWORD

            }
        });

        var mailOptions = {
            from: process.env.GMAIL,
            to: email,
            suject: "testing sending email",
            text:"testing"
        };

        transporter.sendMail(mailOptions,(err, info)=>{
            console.log("error??");
            if(err) {
                console.log(err);
                console.log("nani");
            }else{
                console.log("email sent: ", info.response);
            }
        });
    }
    console.log("yes");
    sentEmail(email);
})