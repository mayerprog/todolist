const mongoose = require("mongoose")

const activities = new mongoose.Schema({

    text: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("activity", activities)
