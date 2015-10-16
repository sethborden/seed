/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Group = require('../api/groups/groups.model');
var Dataset = require('../api/dataset/dataset.model');
var seedUsers = require('./seedUsers')(100, true);
var seedGroups = require('./seedGroups')(20, seedUsers, true);
var seedDatasets = require('./seedDatasets')(20, seedUsers);

seedUsers.push({
    name: 'Seth Borden',
    email: 'seth@mimirate.com',
    provider: 'local',
    password: '9j7uier',
    role: 'admin',
    profile: {
        displayName: 'SethBorden',
        userLocation: 'Rochester, NY',
        userCompany: 'mimirate',
        userAvatar: 'http://36.media.tumblr.com/c039d94fc6b2cfb7f15fe05445daad7d/tumblr_ninzb6Wxcf1rpwm80o1_250.jpg'
    }
});

User.find({}).remove(function() {
    User.create(seedUsers, function(err, res) {
      console.log('finished populating', seedUsers.length, 'users.');
      Group.find({}).remove(function() {
          Group.create(seedGroups, function(err, res) { 
              console.log('finished populating', seedGroups.length, 'groups.');
              Dataset.find({}).remove(function() {
                  Dataset.create(seedDatasets, function(err, res) {
                      console.log('finished populating', seedDatasets.length, 'datasets.');
                  });
              });
          });
      });
    });
});



