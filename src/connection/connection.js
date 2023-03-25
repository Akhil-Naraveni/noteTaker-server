const mongoose = require("mongoose");

async function connection() {
    console.log("connected to mongoDB")
    await mongoose.connect("mongodb://localhost/notetaker")
}

module.exports = connection;