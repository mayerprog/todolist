const mongoose = require("mongoose")

const workActivities = new mongoose.Schema({

    text: {
        type: String,
        required: true
    } 

})

module.exports = mongoose.model("workActivity", workActivities)