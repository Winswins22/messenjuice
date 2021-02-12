const { response } = require('express');
const express = require('express');
const { request } = require('http');
const Datastore = require('nedb');

const db = new Datastore("db/users.db");
// load data
db.loadDatabase();

const app = express()

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({limit:'10mb'}));