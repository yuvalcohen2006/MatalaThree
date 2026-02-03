const mongoose = require("mongoose")

const Soldier = mongoose.model('Soldier', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    team: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = Soldier