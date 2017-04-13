const mongoose = require('mongoose');
const Article = require('mongoose').model('Article');


module.exports = {
    index: (req, res) => {
            res.render('home/index');
    },

    aboutUs: (req, res) => {
        res.render('about/aboutUs');
    },

    blog: (req, res) => {
         Article.find({}).populate('author').then(articles => {
            res.render('blog/blog', {
                articles: articles
            });
        });
    },

    welcome: (req, res) => {
        res.render('intro/welcome');
    }

};
