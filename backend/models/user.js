var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "FirstName is required"]
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    photoURL: String,
}, { timestamps: true })


var User = mongoose.model('user', User);

module.exports = User;