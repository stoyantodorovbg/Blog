const mongoose = require('mongoose');

module.exports = {
    about: (req, res) => {
        res.render('about/about');
    }
}