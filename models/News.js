const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let newsSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {type: String, required: true},
    source: {type: String, required: false},
    date: {type: Date, default: new Date() },
    pathImage: [{type: String}],
    //id: { type: mongoose.Schema.Types.ObjectId}
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
