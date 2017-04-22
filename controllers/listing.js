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

        if (!listingParts.content) {
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
