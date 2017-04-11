const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let messageSchema = mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    content: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId},
    date: {type: Date, default: Date.now() },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
