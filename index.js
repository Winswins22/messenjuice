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
const users = new Datastore("db/users.db");
const chatrooms = new Datastore("db/chatrooms.db");
// load data
users.loadDatabase();
chatrooms.loadDatabase();

// load app
const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => console.log('listening at port:', PORT));

app.use(express.static('public'));
app.use(express.json({ limit: '100mb' }));

// route to home page
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "public/MainPageTemp/mainPage.html");
    // fs.createReadStream("public/MainPageTemp/mainPage.html").pipe(res);
})

/*
// data structure - users.db
using username and email as primary key

{
    username:string
    password:string
    email:string
}

// data structure - messages.db
using usernames and chat room name as primary key

{
    chatRoomID:string
    chat:[username, username],
    messages:[
        {
            txt: string,
            author: string,
            time: string
        }
    ]
}

*/

// get data info
app.get('/getUserInfo', (request, response) => {
    users.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
})

// ---------------registration-------------------
app.post('/regitstration', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;

    let obj = {};

    let res = 1;
    function register() {
        if (res) {
            // user does not exist
            users.insert({
                username: username,
                password: password,
                email: email
            })
            console.log("registration completed successfully")

            // return status
            obj = { status: "success" };
        } else {
            // user exists
            console.log("user already exists");

            // return status
            obj = { status: "failed" };
        }
    }

    users.find({}, (err, data) => {
        // error has occur
        if (err) {
            response.end();
            res = 0;
        }
        // data is undefined
        if (data == undefined) {
            res = 1;
        }
        if (Object.keys(data).length == 0) {
            res = 1;
        }
        for (user of data) {
            if (user.username === username || user.email === email) {
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
app.post("/send-email", (req, res) => {
    const email = req.body.email;
    const path = req.body.path;
    let obj = {}

    function sentEmail(email) {
        // get info from dotenv
        EMAIL = process.env.GMAIL;
        PASSWORD = process.env.PASSWORD;

        // create transportation for sender
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
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
            text: "test",
            html:
                "<p>You have requested a password reset. Click this link to continue</p>" +
                "<a href =\" " + dirPath + " \">Reset Password</a>"
        };

        // send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                obj = { status: "failed" };
            } else {
                console.log("email sent: ", info.response);
                obj = { status: "success" };
            }
        });
    }
    sentEmail(email);
    res.json(obj);
})

// ---------------reset password-------------------

app.post("/resetPassword", (req, res) => {
    const newPassword = req.body.password;
    const email = req.body.email;
    let returnValue = {}

    // search data for username
    async function update() {

        // search data for email
        await users.update({ email: email }, { $set: { password: newPassword } }, {}, (err, numReplace) => {
            if (err) {
                console.log(err);
                returnValue = { status: "failed" };
            }

            console.log("password has been updated");
            console.log("number of lines updated: ", numReplace);

            returnValue = { status: "success" };
            res.json(returnValue);
            return;
        })
        return;
    }
    update()
})

// ---------------save messages-------------------

app.post("/saveMessages", (req, res) => {
    const messages = req.body;

    let status = {};

    // already exists
    async function update(){
        // assuming roomID is unique
        await chatrooms.update({chatRoomID: messages.roomID},{$push : {messages:messages._message}}, {}, ()=> {
            status = {status: "success"};
            console.log("messages updated");
        })
    }

    async function init(){
        // check if it exists

        chatrooms.find({},async (err,data) => {
            if (err){
                status = {status: "failed"};
                console.log(err);
            }
            for (chat of data){
                if (chat.chatRoomID === messages.roomID){
                    // chat already exists
                    update().then(() =>{
                        res.json(status);
                        return;
                    })
                }
            }
            await chatrooms.insert({
                chatRoomID: messages.roomID,
                chat:messages.chat,
                messages:[messages._message]
            })
                
            console.log("chatroom created");
            status = {status: "success"};
            res.json(status);
        })
    }
    init();
})

// ---------------load messages-------------------

app.post('/loadMessages',(req,res)=>{
    
    const chatRoomID = req.body;
    let status = {};

    // search chatrooms
    chatrooms.find({chatRoomID: chatRoomID.chatRoomID},(err,data)=>{
        
        if (err){
            console.log(err);
            status = {status: "failed"};
            res.json(status);
        }

        if (data.length == 0){
            console.log("data is empty");
            return;
        }

        const messages = data[0].messages;

        status = {status: "success", messages:messages};
        console.log(status);
        res.json(status);
    })
})