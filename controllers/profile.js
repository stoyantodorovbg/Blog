const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Profile = require('mongoose').model('Profile')

module.exports = {
    profileGet: (req, res) => {
        res.render('profile/profile', req.user);
    },
    profileEditGet: (req, res) => {

        res.render('profile/editProfile', req.user);


    },
    profileEditPost: (req, res) => {
        let profileParts = req.body;

        let profiles = [];
        Profile.create(profileParts).then(profile => {
            profiles.push(profile.id);
            profile.save();
        });

        let errorMsg = '';

        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to make articles!';
        }
        if (errorMsg) {
            res.render('profile/editProfile', {error: errorMsg});
            return;
        }
        let userId = req.user.id;
        profileParts.user = userId;
        Profile.create(profileParts).then(profile => {
            req.user.profiles.push(profile.id);
            req.user.save(err => {
                if (err) {
                    res.render('profile/editProfile', {error: err.message});
                } else {
                    res.redirect('/profile/profile');
                }
            });
        })
    }
};