const express = require("express");

const router = express.Router();

const applicationController = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applicationController.createApplication
);

router.get(
    "/",
    authMiddleware,
    applicationController.getApplicationsByUser
);

router.get(
    "/stats",
    authMiddleware,
    applicationController.getApplicationStats
);

router.get(
    "/:id",
    authMiddleware,
    applicationController.getApplicationById
);

router.put(
    "/:id/status",
    authMiddleware,
    applicationController.updateApplicationStatus
);

router.delete(
    "/:id",
    authMiddleware,
    applicationController.deleteApplication
);

module.exports = router;