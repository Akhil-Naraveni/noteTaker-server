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

router.post("/login", async (req,res) =>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(400).json({
                status: "failed",
                message : "user is not registered"
            })
        }
        bcrypt.compare(password, user.password, function (err, result){
            if(err){
                return res.status(500).json({
                    status : "failed",
                    message : err.message
                })
            }
            if(result){
                const token = jwt.sign({
                    exp : Math.floor(Date.now()/1000) + (3600),
                    data : user._id,
                }, secret);
                const userdetails = {...user._doc, password: undefined}
                return res.status(201).json({
                    status: "success",
                    message : {token, userdetails}
                })
            }else{
                return res.status(400).json({
                    status :"failed",
                    message : "Invalid User Details"
                })
            }
        })

    } catch (e) {
        res.status(500).json({
            status :"failed",
            message : e.message
        })
        
    }

})

module.exports = router