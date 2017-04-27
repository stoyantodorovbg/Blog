const mongoose = require('mongoose');
const Users = require('mongoose').model('User');

module.exports = {
    usersGet: (req, res) => {
        Users.find({}).then(users => {

            res.render('Users/Users', {
                users: users
            });
        });
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        Users.findById(id).populate('profiles').then(user => {

            res.render('Users/details', {user: user});

        });
    },
};
