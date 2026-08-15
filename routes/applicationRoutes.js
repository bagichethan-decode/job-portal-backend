const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");

router.post("/", applicationController.createApplication);
router.get("/:userId", applicationController.getApplicationsByUser);

module.exports = router;