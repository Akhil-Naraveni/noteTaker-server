const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const User = require("../model/usermodel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const secret = "AKHILNA";

router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: "failed",
                message: "User already exists"
            })
        }

        bcrypt.hash(password, 12, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    status: " Failed",
                    message: err.message
                })
            }
            const data = await User.create({
                email,
                password: hash
            })

            return res.status(201).json({
                status : "success",
                message : "user created successfully",
                data
            })
        })


    } catch (e) {
        res.status(500).json({
            status : "failed",
            message : e.message
        })
    }
})

module.exports = router;