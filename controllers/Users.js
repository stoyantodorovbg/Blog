const mongoose = require('mongoose');

module.exports = {
    usersGet: (req, res) => {
        res.render('Users/Users');
    },
};