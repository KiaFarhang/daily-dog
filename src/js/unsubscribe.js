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
    request.send(JSON.stringify(email));

}


function checkEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
