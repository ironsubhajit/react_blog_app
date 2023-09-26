const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    role: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('users', UserSchema);
