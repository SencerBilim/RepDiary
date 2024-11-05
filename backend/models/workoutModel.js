const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        // enum ensures the day value can only be one of these options
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model("Workout", workoutSchema)
