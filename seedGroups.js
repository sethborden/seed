'use strict';
var _ = require('lodash');
var seedVars = require('./seedInfo');

const properAdjectives = seedVars.properAdjectives;
const orgTypes = seedVars.orgTypes;
const description = seedVars.description;

let randomInt = function(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
};

let makeGroups = function(num, users) {
    let profiles = [];
    while(profiles.length < num) {
        let group = {};
        group.owner = _.sample(users).email;
        group.creator = group.owner;
        group.admins = _(users).chain()
                        .sample(randomInt(1, 5))
                        .map((user) => {
                            return user.email;
                        }).value();
        group.members = _(users).chain()
                        .sample(randomInt(1, 5))
                        .map((user) => {
                            return user.email;
                        }).value();
        group.name = _.sample(properAdjectives) + ' ' + _.sample(orgTypes);
        group.description = description;
        group.authorizationSettings = {
            whoCanAdd: _.sample(['anyone', 'owner', 'admin']),
            canRequestInvite: (Math.random() > 0.5)
        };
        if (_.findIndex(profiles, {name: group.name}) === -1) {
            profiles.push(group);
        }
    }
    return profiles;
};

module.exports = makeGroups;
