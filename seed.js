'use strict';

var users = require('./seedUsers');
var groups = require('./seedGroups');

let generateSeedData = function(groupCount, userCount) {
    return new Promise(resolve => {
        users(userCount, true, true).then(users => {
            groups(groupCount, users).then(groups => {
                resolve({ groups: groups, users: users });
            });
        });
    });
};

module.exports = generateSeedData;
