const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/", jobController.getJobs);

router.post("/", jobController.createJob);

router.get("/search", jobController.searchJobs);

router.get("/:id", jobController.getJobById);

router.put("/:id", jobController.updateJob);

router.delete("/:id", jobController.deleteJob);

module.exports = router;