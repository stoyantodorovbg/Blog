const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let date = new Date();
let dateString = date.toLocaleDateString();
let listingSchema = mongoose.Schema({
    author: { type: String, required: true },
    position: { type: String, required: true},
    email: { type: String, required: true },
    phone: { type: String, required: false },
    content: { type: String, required: true },
    date: {type: String, default: dateString}
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
