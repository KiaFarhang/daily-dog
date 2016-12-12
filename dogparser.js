const us = require('us');

var exports = module.exports = {};

exports.parseDogInfo = function(data) {
    var dog = {
        name: data.name['\$t'],
        sex: genderHandler(data.sex['\$t']),
        breed: breedHandler(data.breeds.breed),
        state: stateHandler(data.contact.state['\$t']),
        description: descriptionHandler(data.description['\$t']),
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
    return 'http://kiafarhang.com/img/no_photo.jpg';
}

function breedHandler(breed) {
    var breedString = '';

    if (Array.isArray(breed) == true) {
        var breedArray = [];
        for (let i = 0; i < breed.length; i++) {
            var thisBreed = breed[i];
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
    if (state != undefined) {
        let stateName = us.lookup(state).name;
        return `from ${stateName}`;
    } else {
        return '';
    }
}

function genderHandler(gender) {
    if (gender == 'M') {
        return 'him';
    } else {
        return 'her';
    }
}

function descriptionHandler(desc) {
    if (desc == undefined || desc == '') {
        desc = `There's no description for this dog on Petfinder. We're just going to guess they enjoy chew toys, cuddling and general mischief.`;
    }
    return desc;
}
