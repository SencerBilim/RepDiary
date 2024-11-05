const express = require("express")
const { createWorkout,
        getWorkout,
        getWorkouts,
        updateWorkout,
        deleteWorkout
    } = require("../controllers/workoutController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

//GET all workouts (can include ?day=monday query parameter)
router.get("/", getWorkouts)

//GET a single workout
router.get("/:id", getWorkout)

//POST a new workout
router.post("/", createWorkout)

//DELETE workout 
router.delete("/:id", deleteWorkout)

//UPDATE a workout
router.patch("/:id", updateWorkout)

module.exports = router