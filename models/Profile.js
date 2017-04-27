const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./User');

let profileSchema = mongoose.Schema({
    profession: {type: String, required: false},
    github: {type: String, required: false},
    email: {type: String, required: false},
    tel: {type: String, required: false},
    country: {type: String, required: false},
    town: {type: String, required: false},
    age: {type: String, required: false},
    sex: {type: String, required: false},
    workExperience: {type: String, required: false},
    education: {type: String, required: false},
    user: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User'},
    date: {type: Date, default: Date.now()},
    pathImage:{type: String}
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
