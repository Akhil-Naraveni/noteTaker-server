const mongoose = require("mongoose")
const objectId = require("mongoose").ObjectId

const notetakerSchema = new mongoose.Schema({
    title : {type : String},
    description : {type : String},
    userId : {type : objectId, ref : "userModel"}
},{timestamps : true})

const NoteTaker = mongoose.model("notes", notetakerSchema);

module.exports = NoteTaker;