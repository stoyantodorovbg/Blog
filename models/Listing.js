const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let listingSchema = mongoose.Schema({
    author: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    content: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId},
    date: {type: Date, default: Date.now() },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
