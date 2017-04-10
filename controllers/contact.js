const mongoose = require('mongoose');

module.exports = {
    ideas: (req, res) => {
        res.render('ideas/ideas');
    },
    contactUs: (req, res) => {
        res.render('about/contactUs');
    }
};
