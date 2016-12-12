const Mailgun = require('mailgun-js');
const request = require('request');
const htmlToText = require('html-to-text');
require('dotenv').config();
const fs = require('fs');
var exports = module.exports = {};

const mailer = require('./mailer.js');
const dogparser = require('./dogparser.js');

var api_key = process.env.MG_PUB;
var api_secret = process.env.MG_SEC;
var domain = process.env.MG_DOMAIN;

exports.handleSubscriber = function(data) {


    var mailgun = new Mailgun({ apiKey: api_secret, domain: domain });

    let subscriber = {
        address: data.address,
        name: data.name,
        subscribed: true
    };

    request.get(`https://api.mailgun.net/v3/address/validate?api_key=${api_key}&address=${subscriber.address}`, function(error, response, body) {
        if (error) {
            console.log(error);
        }
        let valData = JSON.parse(body);
        if (valData['is_valid'] != true) {
            return;
        }
        let list = mailgun.lists('subscribers@mg.dailydogemail.com');
        list.members().create(subscriber, function(error, data) {
            if (error) {
                console.log(error);
            }
            console.log(data);
        });

        let requestOptions = {
            url: process.env.PF_URL,
            encoding: 'utf8'
        };

        request.get(requestOptions, function(error, response, body) {
            if (error) {
                console.log(`Error accessing Petfinder API: ${error}`);
                return;
            }
            let parsedData = JSON.parse(body);
            var dog = dogparser.parseDogInfo(parsedData.petfinder.pet);
            mailer.sendWelcomeMail(dog, subscriber.address);
        });
    });

}
