"use strict";function unsubscribe(e){e.preventDefault();var t=document.getElementById("emailField").value,s=document.getElementsByClassName("emailStatus")[0];if(0==checkEmail(t))return void(s.innerText="Please enter a valid email");var n=new XMLHttpRequest;n.open("POST","/unsubscribe"),n.setRequestHeader("Content-Type","application/json");var i={address:t};n.send(JSON.stringify(i)),document.forms[0].removeEventListener("submit",unsubscribe)}function checkEmail(e){var t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return t.test(e)}document.forms[0].addEventListener("submit",unsubscribe);