const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const userModel = require("../models/user.model");
const { createJWT } = require('../common-libs/jwt');

router.post("/login", async (req, res) => {

    const user = await userModel.find({ phone: req.body.phone });
    if (user.length !== 1) return res.status(401).json({ error: "this phone number doesnt exist" });

    const jwt = createJWT(user._id, user.email, user.phone);
    res.status(200).json({
        user: user[0],
        jwt
    })
});

module.exports = router;