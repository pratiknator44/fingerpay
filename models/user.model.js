const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    type: {type: Number, default: 0, require: true},
    lastModified: {type: String, require: true},    // new Date().toISOString()
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    age: {type: Number, require: true},
    email: {type: String, require: true},
    phone: Number,
    gender: {type: String, require: true, default: 'o'},
    state: String
}, {versionKey: false});


module.exports = mongoose.model("User", userSchema);



/**
 * 0 = free
 * 1 = premium
 * 3 = long term
 */