const mongoose = require('mongoose');
const Article = require('mongoose').model('Article');


module.exports = {
    index: (req, res) => {
            res.render('home/index', {layout:false});
    },

    aboutUs: (req, res) => {
        res.render('about/aboutUs', {layout:false});
    },

    blog: (req, res) => {
         Article.find({}).populate('author').then(articles => {
            res.render('blog/blog', {
                articles: articles,
                layout: false
            });
        });
    },

    welcome: (req, res) => {
        res.render('intro/welcome', {layout: false});
    }

};
