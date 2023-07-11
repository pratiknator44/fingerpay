const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const bankAccountModel = require('../models/bank-account.model');

router.post("/create", async (req, res) => {

    if (!req.body.userId) return res.status(401).json({ error: "\'userId\' is not present in request" });

    try {

        const isDuplicate = await bankAccountModel.exists({accountNo: req.body.userId});
        console.log(isDuplicate);
        if(isDuplicate) return res.status(422).json({error: "Bank account already exists"})

        const bankAc = await new bankAccountModel({
            userId: mongoose.Types.ObjectId(req.body.userId),
            accountNo: req.body.accountNo,
            bankName: req.body.bankName,
            accountType: req.body.accountType
        }).save();

        res.status(201).json(bankAc);

    } catch (e) {
        res.status(500).json(e);

    }
});

module.exports = router;