const mongoose = require("mongoose");
const URL = "mongodb+srv://naraveniakhil:Aakhil2244@instacloneserver.tqjlz9f.mongodb.net/?retryWrites=true&w=majority";

async function connection() {
    await mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology:true})
        console.log("connected to mongoDB")

}

module.exports = connection;
