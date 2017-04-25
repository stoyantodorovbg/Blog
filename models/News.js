const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let date = new Date();
let dateString = date.toLocaleDateString();
let newsSchema = mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: {type: String, required: true},
    source: {type: String, required: false},
    date: {type: String, default: dateString},
    pathImage: [{type: String}],
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
