'use strict';

// document.getElementById('emailField').addEventListener('submit', verifyEmail);
document.forms[0].addEventListener('submit', sendSubscriber);
// document.getElementsByClassName('button')[0].addEventListener('click', sendToVerifyPage);
// window.addEventListener('load', showDog);
document.getElementsByClassName('rotate')[0].addEventListener('click', rotateDog);



function Dog(name, img, gender, age, breed, location, likes, order) {
    this.name = name;
    this.img = img;
    this.gender = gender;
    this.age = age;
    this.breed = breed;
    this.location = location;
    this.likes = likes;
    this.order = order;
}

let currentDog = 0;

var flynn = new Dog('Flynn', 'img/flynn.jpg', 'He', "13 weeks", "terrier/chihuahua mix", 'Minnesota', 'people (and snuggling)', 0);
var oreo = new Dog('Professor Oreo', 'img/oreo.jpg', 'He', '3 years', 'Jack Russel Terrier', "Tennessee", 'playing with friends', 1);

let dogArray = [flynn, oreo];

function rotateDog() {

    let rand = randomInteger();

    while (rand == currentDog) {
        rand = randomInteger();
    }

    let newDog = dogArray[rand];

    postDog(newDog);

    


    function postDog(dog) {
        let name = document.getElementsByClassName('dogName')[0];
        name.innerText = dog.name;

        let img = document.getElementsByClassName('dogImage')[0];
        img.setAttribute('src', dog.img);

        let gender = document.getElementsByClassName('dogGender');
        for (let i = 0; i < gender.length; i++) {
            gender[i].innerText = dog.gender;
        }
        let age = document.getElementsByClassName('dogAge')[0];
        age.innerText = dog.age;

        let breed = document.getElementsByClassName('dogBreed')[0];
        breed.innerText = dog.breed;

        let location = document.getElementsByClassName('location')[0];
        location.innerText = dog.location;

        let likes = document.getElementsByClassName('dogLikes')[0];
        likes.innerText = dog.likes;

        currentDog = dog.order;
    }



    function randomInteger() {
        let min = 0;
        let max = dogArray.length;
        return Math.floor(Math.random() * max);
    }
}



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
