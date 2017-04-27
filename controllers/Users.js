const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Profile = require('mongoose').model('Profile');

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

        Profile.findOne({'user': id}).populate('user').then(profile => {

            res.render('Users/details', {profile: profile});

        });
    },
};
