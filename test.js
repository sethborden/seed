'use strict';

var users = require('./seedUsers');
var groups = require('./seedGroups'); 
var assert = require('assert');

let newUsers = users(10, true);
let newGroups = groups(3, newUsers);

assert.equal(newUsers.length, 10);
assert.equal(newGroups.length, 3);
