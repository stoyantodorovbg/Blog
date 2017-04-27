const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Profile = require('mongoose').model('Profile')

module.exports = {
    profileGet: (req, res) => {
        let userId = req.user.id;

        Profile.findOne({'user': userId}).populate('user').then(profile => {
                res.render('profile/profile', profile);
        });
    },
    profileEditGet: (req, res) => {
        let id = req.params.id;
        let userId = req.user.id;

        Profile.findOne({'user': userId}).populate('user').then(profile => {
                res.render('profile/editProfile', profile);
        });
    },
    profileEditPost: (req, res) => {
        let profileParts = req.body;

        let userId = req.user.id;
        profileParts.user = userId;

        Profile.create(profileParts);
        
        Profile.update({profession: profileParts.profession, github: profileParts.github,
           email: profileParts.email, tel: profileParts.tel, country: profileParts.country,
           town: profileParts.town, age: profileParts.age, sex: profileParts.sex, workExperience: profileParts.workExperience,
           education: profileParts.education}).then(updateStatus => {

                    res.redirect('/profile/profile');
            });
    }
};