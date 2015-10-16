'use strict';

let seed = require('./seedInfo');
//let bcrypt = require('bcrypt');

let randomInt = function(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
};

let randomBoyName = function() {
    return seed.boyNames[randomInt(0, seed.boyNames.length)];
};

let randomGirlName = function() {
    return seed.girlNames[randomInt(0, seed.girlNames.length)];
};

let randomFamName = function() {
    return seed.famNames[randomInt(0, seed.famNames.length)];
};

//Ratio is the percentage of the population that has a female name
let makeName = function(ratio) {
    if(ratio === 'undefined') {
        ratio = 0.5;
    }
    let boyOrGirl = Math.random();
    if(boyOrGirl > ratio) {
        return randomGirlName() + ' ' + randomFamName();
    } else {
        return randomBoyName() +  ' ' + randomFamName();
    }
};

//let saltPassword = function(password) {
//    bcrypt.genSalt(10, (err, salt) => {
//        if(err) { return console.error(err); }
//        bcrypt.hash(password, salt, (err, hash) => {
//            if(err) { return console.error(err); }
//            return hash;
//        });
//    });
//};

let makeEmail = function(name, username) {
    let strategy = Math.random();
    let provider = seed.providers[randomInt(0, seed.providers.length)];
    //fistname.lastname@provider.com
    if (strategy < 0.33) {
        return name.split(' ').join('.').trim().toLowerCase() + '@' + provider;
    //username<randomNumbers>@provider.com
    } else if (strategy > 0.33 && strategy < 0.66) {
        return username + randomInt(1, 299) + '@' + provider;
    //initiallastname@provider
    } else {
        return name[0].toLowerCase() + name.split(' ')[1].toLowerCase() + '@' + provider;
    }
};

let makeProfiles = function(num, unique) {
    let profiles = [];
    while(profiles.length < num) {
        let user = {};
        let username = seed.usernames[randomInt(0, seed.usernames.length)];
        user.name = makeName();
        user.email = makeEmail(user.name, username).toLowerCase();
        //user.password = saltPassword('password');
        user.password = 'password';//saltPassword('password');
        user.profile = {
            displayName: username, 
            userLocation: seed.locations[randomInt(0, seed.locations.length)],
            userCompany: seed.companies[randomInt(0, seed.companies.length)],
            userAvatar: seed.avatarUrls[randomInt(0, seed.avatarUrls.length)]
        };

        if(unique) {
            if(profiles.findIndex((element) => {
                    return element.email === user.email; 
                }) === -1) {
                profiles.push(user);
            }
        } else {
            profiles.push(user);
        }
    }
    return profiles;
};

module.exports = makeProfiles;
