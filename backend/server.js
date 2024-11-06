// Import environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS Middleware to allow requests from your frontend
const corsOptions = {
    origin: "https://repdiary-hfsw.onrender.com", // Replace with your actual frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow credentials if you're using cookies or tokens
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Logger middleware (optional)
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes for workouts and users
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        const PORT = process.env.PORT || 4000; // Use the environment PORT or 4000 for local development
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Connected to DB & listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
