'use strict';


exports.index = function(req, res){
    req.app.get('userdata').then(data => {
        res.render('index', data);
    });
};

exports.users = function(req, res) {
    req.app.get('userdata').then(data => {
        res.render('userList', data);
    });
};

exports.user = function(req, res) {
    req.app.get('userdata').then(data => {
        res.render('user', data.users[req.params.userIndex]);
    });
};

exports.groups = function(req, res) {
    req.app.get('userdata').then(data => {
        res.render('groupList', data);
    });
};

exports.group = function(req, res) {
    req.app.get('userdata').then(data => {
        res.render('group', data.groups[req.params.groupIndex]);
    });
};

