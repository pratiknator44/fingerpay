const mongoose = require("mongoose");

const bankAccountSchema = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    accountType: {type: Number, default: 0, require: true}, // 0 = saving, 1 = current 
    bankName: {type: String, require: true},
    accountNo: {type: String, require: true},
}, {versionKey: false});


module.exports = mongoose.model("BankAccount", bankAccountSchema);
