'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

const mailer = require('./mailer.js');
const dogparser = require('./dogparser.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

app.post('/validation', function(req, res) {
    mailer.handleSubscriber(req.body);
});



// fs.readFile('./keys.json', 'utf8', function(error, contents) {
//     var url = JSON.parse(contents)['pf_url'];

//     request.get(url, function(error, response, body) {

//         if (error) {
//             console.log(`Error accessing Petfinder API: ${error}`);
//         } else {
//             let parsedData = JSON.parse(body);
//             var dog = dogparser.parseDogInfo(parsedData.petfinder.pet);
//             mailer.sendMail(dog);
//         }
//     });
// });



app.listen(5000);
