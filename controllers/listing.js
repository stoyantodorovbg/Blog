const mongoose = require('mongoose');
const Listing = require('mongoose').model('Listing');

module.exports = {
    listingsGet: (req, res) => {//
        Listing.find({}).populate('id').then(listings => {
            res.render('ideas/ideas', {
                listings: listings
            });
        });
    },
    createGet: (req, res) => {
        res.render('about/ideasForm');
    },
    createPost: (req, res) => {
        let listingParts = req.body
        let errorMsg = '';

        if (!listingParts.content) {
            errorMsg = 'Invalid content!';
        }
        if (errorMsg) {
            res.render('about/contactUs', {error: errorMsg});
            return;
        }
        let listings = [];
        Listing.create(listingParts).then(listing => {
            listings.push(listing.id);
            listing.save(err => {
                if (err) {
                    res.render('about/ideasForm', {error: err.message});
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
