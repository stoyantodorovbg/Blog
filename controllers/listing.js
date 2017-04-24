const mongoose = require('mongoose');
const Listing = require('mongoose').model('Listing');

module.exports = {
    listingsGet: (req, res) => {
        Listing.find({}).populate('id').then(listings => {

            res.render('listings/listings', {
                listings: listings
            });
        });
    },
    createGet: (req, res) => {
        res.render('about/listingInput');
    },
    createPost: (req, res) => {
        let listingParts = req.body;
        let errorMsg = '';

        let phoneInput = listingParts.phone;
        let rePhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        let emailInput = listingParts.email;
        let reEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])/;

        if (emailInput.search(reEmail) == -1) {
            errorMsg = emailInput + ' it is not valid email address!';
        }else if (phoneInput.search(rePhone) == -1) {
            errorMsg ='Please, insert valid phone number, using only digits!';
        }else if (!listingParts.content) {
            errorMsg = 'Invalid content!';
        }else if (!listingParts.email) {
            errorMsg = 'Invalid email!';
        }else if (!listingParts.author) {
            errorMsg = 'Invalid name/organization!';
        }
        if (errorMsg) {
            res.render('about/listingInput', {error: errorMsg});
            return;
        }
        let listings = [];
        Listing.create(listingParts).then(listing => {
            listings.push(listing.id);
            listing.save(err => {
                if (err) {
                    res.render('about/listingInput', {error: err.message});
                } else {
                    res.render('about/sentListing');
                }
            });
        })
    },
    sentGet: (req, res) => {
        res.render('/sentListing');
    }
};
