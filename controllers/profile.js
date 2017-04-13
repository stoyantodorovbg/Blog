const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Profile = require('mongoose').model('Profile')

module.exports = {
    profileGet: (req, res) => {
        res.render('profile/profile');
    },
    profileEditGet: (req, res) => {

                res.render('profile/editProfile');


    },
    profileEditPost: (req, res) => {
        let profileParts = req.body;

        let profiles = [];
        Profile.create(profileParts).then(profile => {
            profiles.push(profile.id);
            profile.save(err => {
                if (err) {
                    res.render('profile/editProfile', {error: err.message});
                } else {
                    res.render('profile/editProfile');
                }
            });
        })
    }
};
