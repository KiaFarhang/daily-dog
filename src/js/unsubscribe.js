'use strict';

document.forms[0].addEventListener('submit', unsubscribe);

function unsubscribe(event) {
    event.preventDefault();
    let email = document.getElementById('emailField').value;
    let emailStatus = document.getElementsByClassName('emailStatus')[0];

    if (checkEmail(email) == false) {
        emailStatus.innerText = "Please enter a valid email";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('POST', '/unsubscribe');
    request.setRequestHeader('Content-Type', 'application/json');

    var subscriber = {
    	address : email
    };

    request.send(JSON.stringify(subscriber));

    document.forms[0].removeEventListener('submit', unsubscribe);
}


function checkEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
 