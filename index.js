const mongoose = require("mongoose")
const express = require("express")
const app = express()
const User = require("./src/model/usermodel")
const Notes = require("./src/model/notemodel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const secret = "AKHILNA";

const connect = require("./src/connection/connection")
connect()

const loginRoute = require("./src/routes/login")
const registerRoute = require("./src/routes/register")
const notesRoute = require("./src/routes/notetaker")
const cors = require("cors")
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/v1/notes", (req, res, next) =>{
    try {
        const token = req.headers.authorization;
        jwt.verify(token, secret, (err, result)=>{
            if(err){
                return res.status(401).json({
                    status: "failed",
                    message : "Authorization Failed"
                })
            }else{
                req.userId = result.data;
                next()
            }
        })
    } catch (e) {
        res.status(403).json({
            status : "failed",
            message : e.message
        })
    }
})
app.use("/api/v1/notes/:id", (req, res, next) =>{
    try {
        const token = req.headers.authorization;
        jwt.verify(token, secret, (err, result)=>{
            if(err){
                return res.status(401).json({
                    status: "failed",
                    message : "Authorization Failed"
                })
            }else{
                req.userId = result.data;
                next()
            }
        })
    } catch (e) {
        res.status(403).json({
            status : "failed",
            message : e.message
        })
    }
})

app.use("/api/v1/",loginRoute)
app.use("/api/v1/",registerRoute)
app.use("/api/v1/",notesRoute)

app.get("*", (req, res) =>{
    res.status(404).send("This is not a proper request")
});

app.listen(5000, () =>{
    console.log("server is running on port 5000")
})
