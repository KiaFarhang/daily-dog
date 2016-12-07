'use strict';

// document.getElementById('emailField').addEventListener('submit', verifyEmail);
document.forms[0].addEventListener('submit', sendSubscriber);
// document.getElementsByClassName('button')[0].addEventListener('click', sendToVerifyPage);


function sendSubscriber(event) {

    event.preventDefault();
    let email = document.getElementById('emailField').value;
    let name = document.getElementById('nameField').value;

    let nameStatus = document.getElementsByClassName('nameStatus')[0];
    let emailStatus = document.getElementsByClassName('emailStatus')[0];

    if (name == '' || name == null) {
        nameStatus.innerText = 'Please enter your name';
        return;
    }

    if (checkEmail(email) == false) {
        emailStatus.innerText = 'Please enter a valid email address';
        return;
    }

    let subscriber = {
        address: email,
        name: name
    }; 

    var request = new XMLHttpRequest();
    request.open('POST', '/validation');
    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify(subscriber));

    document.forms[0].removeEventListener('submit', sendSubscriber);

    window.location.href = 'thanks.html';

}

function checkEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
