const mongoose = require('mongoose');
const User = require('mongoose').model('User');

module.exports = {
    usersGet: (req, res) => {
        User.find({}).then(users => {

            res.render('Users/Users', {
                users: users
            });
        });
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        User.findById(id).populate('profile').then(user => {

            res.render('Users/details', {user: user});

        });
    },
};
