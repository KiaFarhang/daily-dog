const Mailgun = require('mailgun-js');
const request = require('request');
const htmlToText = require('html-to-text');
require('dotenv').config();
const fs = require('fs');
var exports = module.exports = {};

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
    });

}

exports.unsubscribe = function(data) {
    var options = {
        url: `https://api.mailgun.net/v3/mg.dailydogemail.com/unsubscribes?address=${data.address}&tag=*`,
        auth: {
            user: 'api',
            pass: api_secret
        }
    };

    request.post(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(body);
    });
}
