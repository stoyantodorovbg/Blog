const mongoose = require('mongoose');
const Users = require('mongoose').model('User');

module.exports = {
    usersGet: (req, res) => {
            res.render('Users/Users');
    },
};