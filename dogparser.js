const us = require('us');

var exports = module.exports = {};

exports.parseDogInfo = function(data) {
    var dog = {
        name: data.name['\$t'],
        sex: genderHandler(data.sex['\$t']),
        breed: breedHandler(data.breeds.breed),
        state: stateHandler(data.contact.state['\$t']),
        description: data.description['\$t'],
        photo: photoHandler(data.media.photos.photo),
        link: 'https://www.petfinder.com/petdetail/' + data.id['\$t']
    };

    return dog;
};

function photoHandler(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['\@size'] === 'x') {
            return (array[i]['\$t']);
        }

    }
}

function breedHandler(breed) {
    var breedString = '';

    if (breed.isArray == true) {
        var breedArray = [];
        for (let i = 0; i < breed.length; i++) {
            var thisBreed = breed[i];
            console.log(`This breed: ${thisBreed}`);
            breedArray.push(thisBreed['\$t']);
        }
        breedString = breedArray.join('/');
        breedString += ' mix';

    } else {
        breedString += breed['\$t'];
    }
    return breedString;
}

function stateHandler(state) {
    return us.lookup(state).name;
}

function genderHandler(gender) {
    if (gender == 'M') {
        return 'him';
    } else {
        return 'her';
    }
}
