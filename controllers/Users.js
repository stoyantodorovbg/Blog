const mongoose = require('mongoose');
const User = require('mongoose').model('User');

module.exports = {
    usersGet: (req, res) => {//
        User.find({}).populate('id').then(users => {

            res.render('users/users', {
                users: users
            });
        });
    },
};