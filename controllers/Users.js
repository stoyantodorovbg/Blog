const mongoose = require('mongoose');
const User = require('mongoose').model('User');

module.exports = {
    Users: (req, res) => {
        res.render('Users/Users');
    },
    usersList: (req, res) => {
        User.find({}).populate('articles').then(users => {
            res.render('Users/Users', {
                users: users
            });
        });
    }
};