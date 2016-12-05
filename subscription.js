const Mailgun = require('mailgun-js');
const request = require('request');
const htmlToText = require('html-to-text');
const fs = require('fs');
var exports = module.exports = {};

exports.handleSubscriber = function(data) {
    fs.readFile('./keys.json', 'utf8', function(err, contents) {
        var api_key = JSON.parse(contents)['mg_api'];
        var api_secret = JSON.parse(contents)['mg_secret'];
        var domain = JSON.parse(contents)['mg_domain'];

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
    });
}