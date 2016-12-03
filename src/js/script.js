'use strict';

// document.getElementById('emailField').addEventListener('submit', verifyEmail);
document.forms[0].addEventListener('submit', sendSubscriber);


function sendSubscriber(event){

	event.preventDefault();
	let email = document.getElementById('emailField').value;
	let name = document.getElementById('nameField').value;

	var subscriber = {
		address: email,
		name: name
	};

	var request = new XMLHttpRequest();
	request.open('POST', '/validation');
	request.setRequestHeader('Content-Type', 'application/json');

	request.send(JSON.stringify(subscriber));
}