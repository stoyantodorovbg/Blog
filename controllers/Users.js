const mongoose = require('mongoose');
const Users = require('mongoose');

module.exports = {
    usersGet: (req, res) => {
        res.render('Users/Users');
    },
    usersList: (req, res) => {
        Users.find({}).populate('author').then(users => {
            res.render('Users/Users', {
                users: users
            });
        });
    },
};
