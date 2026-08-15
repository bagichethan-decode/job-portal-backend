const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, applicationController.createApplication);
router.get("/", authMiddleware, applicationController.getApplicationsByUser);

module.exports = router;