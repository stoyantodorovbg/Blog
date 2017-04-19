const mongoose = require('mongoose');
const Message = require('mongoose').model('Message');

module.exports = {
    ideas: (req, res) => {//
        Message.find({}).populate('id').then(messages => {
            res.render('ideas/ideas', {
                messages: messages
            });
        });
    },
    createGet: (req, res) => {
        res.render('about/contactUs');
    },
    createPost: (req, res) => {
        let messageParts = req.body
        let errorMsg = '';

       if (!messageParts.content) {
            errorMsg = 'Invalid content!';
        }
        if (errorMsg) {
            res.render('about/contactUs', {error: errorMsg});
            return;
        }
        let messages = [];
        Message.create(messageParts).then(message => {
            messages.push(message.id);
            message.save(err => {
                if (err) {
                    res.render('about/ContactUs', {error: err.message});
                } else {
                    res.render('about/sendMessage');
                }
            });
        })
    },
    sentGet: (req, res) => {
        res.render('/sendMessage');
    }
};
