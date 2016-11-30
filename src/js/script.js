'use strict';

// document.getElementById('emailField').addEventListener('submit', verifyEmail);
document.forms[0].addEventListener('submit', verifyEmail);


function verifyEmail(event){

	event.preventDefault();
	let email = document.getElementById('emailField').value;

	var params = {
		address: email
	};

	var valRequest = new XMLHttpRequest();
	valRequest.open('POST', '/validation');
	valRequest.setRequestHeader('Content-Type', 'application/json');

	valRequest.send(JSON.stringify(params));


}