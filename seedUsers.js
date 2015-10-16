'use strict';

/* Import statements */
let seed = require('./seedInfo');
let bcrypt = require('bcrypt');

/**
 * Generates a random integer between min and max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
let randomInt = function(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
};

/**
 * Returns a name from the list provided by seed.boyNames
 * @returns {string}
 */
let randomBoyName = function() {
    return seed.boyNames[randomInt(0, seed.boyNames.length)];
};

/**
 * Returns a name from the list provided by seed.girlNames
 * @returns {string}
 */
let randomGirlName = function() {
    return seed.girlNames[randomInt(0, seed.girlNames.length)];
};

/**
 * Returns a family name (surname/last name) provided by seed.famNames
 * @returns {string}
 */
let randomFamName = function() {
    return seed.famNames[randomInt(0, seed.famNames.length)];
};

/**
 * Generates a name that has a {ratio} percent chance of being a girl's name
 * @param {number} ratio
 * @returns {string}
 */
let makeName = function(ratio) {
    //We need the following statement since V8 (and Node) haven't impletmented
    //default function parameters.
    if(ratio === 'undefined') {
        ratio = 0.5;
    }
    if(Math.random() > ratio) {
        return randomGirlName() + ' ' + randomFamName();
    } else {
        return randomBoyName() +  ' ' + randomFamName();
    }
};

/**
 * Despite the fact that all passwords for generated users are set to
 * 'password', it's always good pratice to salt and hash the password. We
 * provide it to the user as an option. Since this is a computationally
 * intensive operation, we return a promise so as to remain non-blocking.
 * @param {string} password
 * @returns {Promise}
 */
let saltPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) { reject(err); }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) { reject(err); }
                resolve(hash);
            });
        });
    });
};

/**
 * Generates an email address based on the users user name or true name, and a
 * list of email providers given by seed.providers.
 * @param {string} name
 * @param {string} username
 * @returns {string}
 */
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

/**
 * Generate a new profile based on our seed data
 * @returns {Object}
 */
let makeProfile = function () {
    let user = {};
    let username = seed.usernames[randomInt(0, seed.usernames.length)];
    user.name = makeName();
    user.email = makeEmail(user.name, username).toLowerCase();
    user.password = 'password';
    user.ownerOf = [];
    user.adminOf = [];
    user.memberOf = [];
    user.creatorOf = [];
    user.profile = {
        displayName: username, 
        userLocation: seed.locations[randomInt(0, seed.locations.length)],
        userCompany: seed.companies[randomInt(0, seed.companies.length)],
        userAvatar: seed.avatarUrls[randomInt(0, seed.avatarUrls.length)]
    };
    return user;
};

/**
 * Generate {num} profiles that may be unique and may have their passwords
 * salted and hashed.
 * @param {integer} num
 * @param {boolean} unique
 * @param {boolean} saltAndHash 
 * @returns {Promise}
 */
let makeProfiles = function(num, unique, saltAndHash) {
    let profiles = [];
    while(profiles.length < num) {
        let user = makeProfile();
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

    return new Promise((resolve) => {
        if(saltAndHash) {
            //TODO: rework this, it doesn't seem quite right
            Promise.all(profiles.map(profile => {
                return saltPassword(profile.password);
            })).then(saltyHashes => {
                saltyHashes.forEach((saltyHash, idx) => {
                    profiles[idx].password = saltyHash;
                }); 
                resolve(profiles);
            });
        } else {
            resolve(profiles);
        }
    });

};

module.exports = makeProfiles;
