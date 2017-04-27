const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    dateLocal: {type: String},
    date: {type: Date, default: new Date()},
    dateEdit: {type: Date},
    pathImage: [{type: String, required: true}],
    pathPdf: {type: String}
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;