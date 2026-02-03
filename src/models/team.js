const mongoose = require("mongoose")

const Team = mongoose.model("Team", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    leader: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Team