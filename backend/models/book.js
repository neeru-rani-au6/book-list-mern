var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Book = new Schema({
    title: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Title is true"]
    },
    author: {
        type: String,
        lowercase: true,
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User id can not be null"]
    },
    genre: {
        type: String,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        lowercase: true,
        trim: true
    },
    public: {
        type: Boolean,
        default: false
    },
    photoURL: String,
}, { timestamps: true });

var Book = mongoose.model("book", Book);

module.exports = Book;