const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const fs = require('fs');
const Datastore = require('nedb');

// access database
const db = new Datastore("db/users.db");
// load data
db.loadDatabase();
    
const app = express()

// route to home page
app.get('/', function (req, res) {
    fs.createReadStream("public/MainPageTemp/mainPage.html").pipe(res);
 })

app.listen(process.env.PORT || 3000, () => console.log('listening'));

app.use(express.static('public'));
app.use(express.json({limit:'10mb'}));

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

// ---------------login INFO-------------------
app.get('/loginINFO', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        console.log(data);
        response.json(data);
    });
});

// ---------------regitstration-------------------
app.post('/regitstration', (request, response) => {
    let _userID_ = db.__Nuser__;
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;

    let obj = {};
    
    let res = 1;

    // I'm not sure if you need to pass in res here.
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
            console.log("nani",user.user.username,user.user.password,user.user.email);
            if (user.user.username === username || user.user.email === email){
                // user already exists
                res = 0;
            }
        }
        // I'm not sure if you need to pass in res here.
        register();
        response.json(obj);
    })
});
