'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

const mailer = require('./mailer.js');
const dogparser = require('./dogparser.js');
const subscription = require('./subscription.js');

var app = express();

var cronJob = require('cron').CronJob;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

app.post('/validation', function(req, res) {
    subscription.handleSubscriber(req.body);
});

const pf_key = process.env.PF_KEY;


let url = `http://api.petfinder.com/pet.getRandom?key=${pf_key}&animal=dog&output=basic&format=json`;

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
