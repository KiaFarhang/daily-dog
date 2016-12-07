'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

require('dotenv').config();

const mailer = require('./mailer.js');
const dogparser = require('./dogparser.js');
const subscription = require('./subscription.js');

var app = express();

var cronJob = require('cron').CronJob;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let options = {
    root: __dirname + '/dist/'
};


const url = process.env.PF_URL;

// app.get('/', function(req, res){
//     res.sendFile('index.html', options);
// });

app.use(express.static('dist'));

app.post('/validation', function(req, res) {
    subscription.handleSubscriber(req.body);
});

app.post('/unsubscribe', function(req, res) {
    subscription.unsubscribe(req.body);
});

var job = new cronJob('00 15 8 * * *', function() {
    request.get(url, function(error, response, body) {
        if (error) {
            console.log(`Error accessing Petfinder API: ${error}`);
            return;
        }
        let parsedData = JSON.parse(body);
        var dog = dogparser.parseDogInfo(parsedData.petfinder.pet);
        mailer.sendDailyMail(dog);
    });
}, function() {}, true, 'America/Los_Angeles');



app.listen(process.env.PORT || 5000);
