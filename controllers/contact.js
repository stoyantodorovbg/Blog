const mongoose = require('mongoose');
const Message = require('mongoose').model('Message');

module.exports = {
    createGet: (req, res) => {
            if (req.user) {
                req.user.isInRole('Admin').then(isAdmin => {
                    let isUserAuthorized = isAdmin;

                    res.render('about/contactUs', {
                        isUserAuthorized: isUserAuthorized
                    });
                });
            } else{
                res.render('about/contactUs',req.user);
            }
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
                    res.render('about/sentMessage');
                }
            });
        })
    },
    sentGet: (req, res) => {
        res.render('/sentMessage');
    },
    messagesGet: (req, res) => {
            if(!req.isAuthenticated()){
                let returnUrl = `/about/contactUs/${id}`;
                req.session.returUrl = returnUrl;

                res.redirect('/user/login');
                return;
            }

        Message.find({}).then(messages => {
            req.user.isInRole('Admin').then(isAdmin => {
                if(!isAdmin){
                    res.redirect('/contactUs');
                    return;
                }
                res.render('about/messages', {messages: messages})
            });
        });
    },
};
