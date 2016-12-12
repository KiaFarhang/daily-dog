'use strict';

document.forms[0].addEventListener('submit', sendSubscriber);


function sendSubscriber(event) {

    event.preventDefault();
    let email = document.getElementById('emailField').value;
    let name = document.getElementById('nameField').value;

    let nameStatus = document.getElementsByClassName('nameStatus')[0];
    let emailStatus = document.getElementsByClassName('emailStatus')[0];

    if (name == '' || name == null) {
        nameStatus.innerText = 'Please enter your name';
        setTimeout(function(){
            nameStatus.innerText = '';
        }, 2500);

        return;
    }

    if (checkEmail(email) == false) {
        emailStatus.innerText = 'Please enter a valid email address';
        setTimeout(function(){
            emailStatus.innerText = '';
        }, 2000);
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

    let h3 = document.getElementsByTagName('h3')[0];
    h3.innerText = 'Thanks! Your first email is on the way.';

    document.forms[0].removeEventListener('submit', sendSubscriber);

}

function checkEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}