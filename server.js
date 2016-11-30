'use strict';

const express = require('express');
const http = require('http');
const fs = require('fs');

const mailer = require('./mailer.js');
const dogparser = require('./dogparser.js');
var app = express();

app.use(express.static('dist'));

app.post('/validation', function(req, res){
    console.log(req.params);
});

fs.readFile('./keys.json', 'utf8', function(error, contents) {
    var url = JSON.parse(contents)['pf_url'];

    http.get(url, function(response) {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', function(chunk) {
            return rawData += chunk;
        });
        response.on('end', function() {
            try {
                let parsedData = JSON.parse(rawData);
                var dog = dogparser.parseDogInfo(parsedData.petfinder.pet);

                mailer.sendMail(dog);
            } catch (e) {
                console.log(`Error: ${e.message}`);
            }
        });
    });

    app.listen(5000);
});
    