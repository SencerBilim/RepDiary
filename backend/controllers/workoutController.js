const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

//get all workouts for a specific day
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const { day } = req.query  // Get day from query parameters

    let query = { user_id }
    if (day) {
        query.day = day.toLowerCase()
    }

    const workout = await Workout.find(query).sort({createdAt: -1})
    res.status(200).json(workout)
}

//get a single workout 
const getWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps, day} = req.body

    let emptyFields = [];

    if(!title) {
        emptyFields.push("title")
    }
    if(!load) {
        emptyFields.push("load")
    }
    if(!reps) {
        emptyFields.push("reps")
    }
    if(!day) {
        emptyFields.push("day")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields})
    }

    // validate day value
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    if (!validDays.includes(day.toLowerCase())) {
        return res.status(400).json({ error: "Invalid day selected" })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({
            title, 
            load, 
            reps, 
            day: day.toLowerCase(), 
            user_id
        })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    // If updating day, validate it
    if (req.body.day) {
        const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        if (!validDays.includes(req.body.day.toLowerCase())) {
            return res.status(400).json({ error: "Invalid day selected" })
        }
        req.body.day = req.body.day.toLowerCase()
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}