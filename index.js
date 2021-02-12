const { response } = require('express');
const express = require('express');
const { request } = require('http');
const Datastore = require('nedb');

// access database
const db = new Datastore("db/users.db");
// load data
db.loadDatabase();

const app = express()

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({limit:'10mb'}));

// app.get('/api', (request, response) => {
//     db.find({}, (err, data) => {
//       if (err) {
//         response.end();
//         return;
//       }
//       response.json(data);
//     });
// });

app.post('/loginINFO',(request, response)=>{
    let username = request.body.username;
    let password = request.body.password;
    let result = checkUser(username,password);
    result = result == 0 ? "Username not in database" : "Username already in database";
    response.json({
        result:result
    });
});

function checkUser(username, password){
    // check if username in database
    db.find({ 'username': username, 'password': password }, function(err, user) {
        if (err) {
            return 0;
        }
        //if user found.
        if (user.length!=0) {
            if(user[0].username && user[0].password) {
                if (user[0].username == username && user[0].password == password){
                    return 1;
                }                         
            }                                
            var err = new Error();
            err.status = 310;
            return 0;
        }
        return 0;
    });
    return 0;
}