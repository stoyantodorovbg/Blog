const mongoose = require('mongoose');
const User = require('mongoose').model('User');

module.exports = {
    usersGet: (req, res) => {
        res.render('Users/Users');
    },
};
