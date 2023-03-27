const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const User = require("../model/usermodel")
const Notes = require("../model/notemodel")

const bodyParser = require("body-parser");


router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.post("/notes", async (req, res) =>{
    try {
        const userId = req.userId
        const data = [req.body]
        const notesData = data.map(d => {return {...d, userId:userId}})
        console.log(notesData)
        const notesTakerData = await Notes.create(notesData)
        res.status(201).json({
            status : "success",
            message : "notes added successfully",
            notesTakerData
        })

    } catch (e) {
        res.status(404).json({
            status : "failed",
            message : e.message
            
        })
    }
})

router.get("/notes", async(req, res) =>{
    try {
        const notesData = await Notes.find({userId: req.userId})
        console.log(notesData)
        res.status(200).json({
            status : "success",
            notes : notesData
        })
    } catch (e) {
        res.status(404).json({
            status:"failed",
            message : e.message
        })
    }
})


router.get("/notes/:id", async(req, res) =>{
    try {
        const notesData = await Notes.find({_id :req.params.id , userId: req.userId})
        console.log(notesData)
        res.status(200).json({
            status : "success",
            notes : notesData
        })
    } catch (e) {
        res.status(404).json({
            status:"failed",
            message : e.message
        })
    }
})

router.delete("/notes/:id", async(req, res) =>{
    try {
        const data = await Notes.deleteOne({_id : req.params.id})
        res.status(200).json({
            status: "success",
            message : "note deleted succesfully"
        })
    } catch (e) {
        res.status(500).json({
            status : "failed",
            message : e.message
        })
    }
})

router.put("/notes/:id", async(req, res) =>{
    try {
        const notesData = await Notes.updateOne({_id :req.params.id , userId: req.userId}, req.body)
        console.log(notesData)
        res.status(201).json({
            status : "notes updated successfully",
            notes : notesData
        })
    } catch (e) {
        res.status(404).json({
            status:"failed",
            message : e.message
        })
    }
})

router.delete("/notes", async(req, res) =>{
    try {
        const data = await Notes.deleteMany({})
        res.status(200).json({
            status: "success",
            message : "notes deleted succesfully"
        })
    } catch (e) {
        res.status(500).json({
            status : "failed",
            message : e.message
        })
    }
})



module.exports = router;