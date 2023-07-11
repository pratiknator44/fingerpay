const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const userModel = require("../models/user.model");
const { checkAuth } = require('../common-libs/jwt');

router.post("/create", async (req, res) => {
    try {
        const userCreate = new userModel({
            _id: new mongoose.Types.ObjectId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            state: req.body.state
        });
        const response = await userCreate.save();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});


router.post("/getUser", async (req, res) => {
    try {
        const user = await userModel.find({ phone: req.body.phone });
        if (user.length !== 1) { return res.status(200).json({ newUser: true }); }
        return res.status(200).json(user[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
});


module.exports = router;