const mongoose = require('mongoose');
const User = require('mongoose').model('User');

module.exports = {
    profileGet: (req, res) => {
        res.render('profile/profile');
    },
    profileEditGet: (req, res) => {
        res.render('profile/editProfile');
    }
};
