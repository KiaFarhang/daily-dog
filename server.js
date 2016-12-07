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

let options = {
    root: __dirname + '/dist/'
};

app.get('/', function(req, res){
    res.sendFile('index.html', options);
});

app.post('/validation', function(req, res) {
    subscription.handleSubscriber(req.body);
});

app.post('/unsubscribe', function(req.res){
    subscription.unsubscribe(req.body);
});

fs.readFile('./keys.json', 'utf8', function(error, contents) {
    var url = JSON.parse(contents)['pf_url'];

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
});


app.listen(process.env.PORT || 5000);
