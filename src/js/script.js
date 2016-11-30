'use strict';

// document.getElementById('emailField').addEventListener('submit', verifyEmail);
document.forms[0].addEventListener('submit', verifyEmail);


function verifyEmail(event){

	event.preventDefault();
	let email = document.getElementById('emailField').value;

	// var url = '/validation?&email=${email}';

	var params = {
		email: email
	};

	var valRequest = new XMLHttpRequest();
	valRequest.open('POST', '/validation');

	valRequest.send(params);


}