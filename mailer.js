const Mailgun = require('mailgun-js');
const https = require('https');
const htmlToText = require('html-to-text');
const fs = require('fs');
var exports = module.exports = {};


exports.validateAddress = function(address) {
    fs.readFile('./keys.json', 'utf8', function(err, contents) {
        var api_key = JSON.parse(contents)['mg_api'];
        var domain = JSON.parse(contents)['mg_domain'];

        var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

        https.get(`https://api.mailgun.net/v3/address/validate?api_key=${api_key}&address=${address}`, function(response) {
            response.setEncoding('utf8');
            let rawData = '';
            response.on('data', function(chunk) {
                return rawData += chunk;
            });
            response.on('end', function() {
            try {
                let parsedData = JSON.parse(rawData);
                console.log(parsedData['is_valid']);
            } catch (e) {
                console.log(`Error: ${e.message}`);
            }
            });

        });

        // mailgun.get(`https://api.mailgun.net/v3/address/validate?api_key=${api_key}&address=${address}`, function(err, response){
        //     console.log(JSON.parse(response));
        // });

    });
}



exports.sendMail = function(data) {

    fs.readFile('./keys.json', 'utf8', function(err, contents) {

        var from_name = 'kfarhang0@gmail.com';
        var api_key = JSON.parse(contents)['mg_secret'];
        var domain = JSON.parse(contents)['mg_domain'];

        var dailyTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>The Daily Dog</title>
      </head>
      <body bgcolor="#FFFFFF" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0;"><style type="text/css">
    @media only screen and (max-width: 600px) {
      a[class="btn"] {
        display: block !important; margin-bottom: 10px !important; background-image: none !important; margin-right: 0 !important;
      }
      div[class="column"] {
        width: auto !important; float: none !important;
      }
      table.social div[class="column"] {
        width: auto !important;
      }
    }
    </style>
        <!-- BODY -->
        <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 100%; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
                <td class="container" bgcolor="#FFFFFF" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">
                    <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; max-width: 600px; display: block; margin: 0 auto; padding: 15px;">
                        <table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 100%; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                    <h3 style="font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; line-height: 1.1; color: #000; font-weight: 500; font-size: 27px; margin: 0 0 15px; padding: 0;">Meet ${data.name}.</h3>
                                    <p class="lead" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: normal; font-size: 17px; line-height: 1.6; margin: 0 0 10px; padding: 0;">${data.name} is a ${data.breed} from ${data.state}. </p>
                                    <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 1.6; margin: 0 0 10px; padding: 0;"><img src=${data.photo} style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; max-width: 100%; margin: 0; padding: 0;" /></p>
                                    <!-- Callout Panel -->
                                    <p class="callout" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 1.6; background: #ECF8FF; margin: 0 0 15px; padding: 15px;">
                                       Interested in sponsoring or adopting ${data.name}? You can <a href=${data.link} style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #2BA6CB; font-weight: bold; margin: 0; padding: 0;">read more about ${data.sex} on Petfinder.</a>
                                    </p>
                                    <!-- /Callout Panel -->
                                    <h3 style="font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; line-height: 1.1; color: #000; font-weight: 500; font-size: 27px; margin: 0 0 15px; padding: 0;">About ${data.name}</h3>
                                    <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 1.6; margin: 0 0 10px; padding: 0;">${data.description}</p>
                                    <a href=${data.link} class="btn" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #FFF; text-decoration: none; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; background: #666; margin: 0 10px 0 0; padding: 10px 16px;">Sponsor</a>
                                    <br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;" /><br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;" /><!-- social & contact --><table class="social" width="100%" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 100%; background: #ebebeb; margin: 0; padding: 0;" bgcolor="#ebebeb"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                                <!--- column 1 -->
                                                <table align="left" class="column" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 280px; float: left; min-width: 279px; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 15px;">
                                                            <h5 class="" style="font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; line-height: 1.1; color: #000; font-weight: 900; font-size: 17px; margin: 0 0 15px; padding: 0;">Connect with Us:</h5>
                                                            <p class=""></p>
                                                        </td>
                                                    </tr></table><!-- /column 1 --><!--- column 2 --><table align="left" class="column" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 280px; float: left; min-width: 279px; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 15px;">
                                                            <h5 class="" style="font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; line-height: 1.1; color: #000; font-weight: 900; font-size: 17px; margin: 0 0 15px; padding: 0;">Contact Info:</h5>
                                                            <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 1.6; margin: 0 0 10px; padding: 0;">Phone: <strong style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">408.341.0600</strong>
                                                                <br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;" /> Email: <strong style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><a href="emailto:hseldon@trantor.com" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #2BA6CB; margin: 0; padding: 0;">hseldon@trantor.com</a></strong></p>
                                                        </td>
                                                    </tr></table><!-- /column 2 --><span class="clear" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; display: block; clear: both; margin: 0; padding: 0;"></span>
                                            </td>
                                        </tr></table><!-- /social & contact --></td>
                            </tr></table></div>
                </td>
                <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
            </tr></table><!-- /BODY --><!-- FOOTER --><table class="footer-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
                <td class="container" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">
                    <!-- content -->
                    <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; max-width: 600px; display: block; margin: 0 auto; padding: 15px;">
                        <table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; width: 100%; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><td align="center" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                    <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 1.6; margin: 0 0 10px; padding: 0;">
                                        <a href="#" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #2BA6CB; margin: 0; padding: 0;">Terms</a> |
                                        <a href="#" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #2BA6CB; margin: 0; padding: 0;">Privacy</a> |
                                        <a href="#" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #2BA6CB; margin: 0; padding: 0;">
                                            <unsubscribe style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">Unsubscribe</unsubscribe></a>
                                    </p>
                                </td>
                            </tr></table></div>
                    <!-- /content -->
                </td>
                <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
            </tr></table><!-- /FOOTER --></body>
    </html>`;

        var dailyTemplateText = htmlToText.fromString(dailyTemplate);

        var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

        var mailData = {
            from: from_name,
            to: 'kfarhang0@gmail.com',
            subject: `Your daily dog: ${data.name}`,
            text: dailyTemplateText,
            html: dailyTemplate
        };

        mailgun.messages().send(mailData, function(err, body) {
            if (err) {
                console.log('Mailing Error:', err);
            } else {
                console.log('Success!');
            }
        });

    });



};
