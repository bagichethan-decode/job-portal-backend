const express = require("express");

const router = express.Router();

const applicationController = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Candidate: apply for a job
router.post(
    "/",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applicationController.createApplication
);

// Candidate: view own applications
router.get(
    "/",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applicationController.getApplicationsByUser
);

// Employer: view applications for their jobs
router.get(
    "/employer",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    applicationController.getApplicationsByEmployer
);

// Candidate: application statistics
router.get(
    "/stats",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applicationController.getApplicationStats
);

// Candidate: view one of their applications
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applicationController.getApplicationById
);

// Employer: update application status
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    applicationController.updateApplicationStatus
);

// Candidate: delete their application
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applicationController.deleteApplication
);

module.exports = router;