const Mailgun = require('mailgun-js');
const request = require('request');
const htmlToText = require('html-to-text');
const fs = require('fs');
var exports = module.exports = {};

const mg_pub = process.env.MG_PUB;
const mg_secret = process.env.MG_SEC;
const mg_domain = process.env.MG_DOMAIN;

exports.handleSubscriber = function(data) {

    var mailgun = new Mailgun({ apiKey: mg_secret, domain: mg_domain });

    let subscriber = {
        address: data.address,
        name: data.name,
        subscribed: true
    };

    request.get(`https://api.mailgun.net/v3/address/validate?api_key=${mg_pub}&address=${subscriber.address}`, function(error, response, body) {
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
