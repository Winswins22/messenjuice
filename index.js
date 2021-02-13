const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const Datastore = require('nedb');
const fs = require('fs');
// use to sent email
const nodemailer = require("nodemailer");

// access database
const db = new Datastore("db/users.db");
// load data
db.loadDatabase();

const app = express()

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));

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
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GMAIL,
                pass: process.env.PASSWORD
            }
        });

        var mailOptions = {
            from: "messenjuice@gmail.com",
            to: email,
            suject: "testing sending email",
            text:"testing"
        };

        transporter.sendMail(mailOptions,(err, info)=>{
            if(err) {
                console.log(err);
            }else{
                console.log("email sent: ", info.response);
            }
        });
    }
    sentEmail(email);
})