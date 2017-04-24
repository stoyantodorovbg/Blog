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

        let phoneInput = messageParts.phone;
        let rePhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        let emailInput = messageParts.email;
        let reEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])/;

        if (emailInput.search(reEmail) == -1) {
            errorMsg = emailInput + ' it is not valid email address!';
        }else if (phoneInput.search(rePhone) == -1) {
            errorMsg ='Please, insert valid phone number, using only digits!';
        }else if (!messageParts.content) {
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
