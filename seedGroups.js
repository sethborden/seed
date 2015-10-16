'use strict';
var _ = require('lodash');
var seedVars = require('./seedInfo');

const properAdjectives = seedVars.properAdjectives;
const orgTypes = seedVars.orgTypes;
const description = seedVars.description;

let randomInt = function(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
};

let makeOwner = function(users, groupData) {
    let email = _.sample(users).email;
    let index = _.findIndex(users, (user) => {
        return user.email === email;
    });
    users[index].ownerOf.push(groupData);
    users[index].creatorOf.push(groupData);
    return {
        email: email,
        index: index
    };
};

let makeGroups = function(num, users) {
    let profiles = [];
    while(profiles.length < num) {
        let group = {};

        group.name = _.sample(properAdjectives) + ' ' + _.sample(orgTypes);

        group.owner = makeOwner(users, {
            name: group.name,
            index: profiles.length
        });

        group.creator = group.owner;

        group.admins = _(users).chain()
                        .sample(randomInt(1, 5))
                        .map((user) => {
                            return {
                                email: user.email,
                                index: _.findIndex(users, (u) => {
                                    return u.email === user.email;
                                })
                            };
                        })
                        .forEach(user => {
                            users[user.index].adminOf.push({
                                name:  group.name,
                                index: profiles.length
                            });
                        }).value();

        group.members = _(users).chain()
                        .sample(randomInt(1, 5))
                        .map((user) => {
                            return {
                                email: user.email,
                                index: _.findIndex(users, (u) => {
                                    return u.email === user.email;
                                })
                            };
                        })
                        .forEach(user => {
                            users[user.index].memberOf.push({
                                name:  group.name,
                                index: profiles.length
                            });
                        }).value();


        group.description = description;
        group.authorizationSettings = {
            whoCanAdd: _.sample(['anyone', 'owner', 'admin']),
            canRequestInvite: (Math.random() > 0.5)
        };

        if (_.findIndex(profiles, {name: group.name}) === -1) {
            profiles.push(group);
        }
    }
    return new Promise(resolve => {
        resolve(profiles);
    });
};

module.exports = makeGroups;
