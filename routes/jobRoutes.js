const express = require("express");

const router = express.Router();

const jobController = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get all jobs
router.get(
    "/",
    jobController.getJobs
);

// Search jobs
router.get(
    "/search",
    jobController.searchJobs
);

// Get job by ID
router.get(
    "/:id",
    jobController.getJobById
);

// Create job - EMPLOYER only
router.post(
    "/",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    jobController.createJob
);

// Update job - EMPLOYER only + ownership check
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    jobController.updateJob
);

// Delete job - EMPLOYER only + ownership check
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    jobController.deleteJob
);

module.exports = router;