const jobModel = require("../models/jobModel");

const getJobs = (req, res) => {
    jobModel.getAllJobs((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch jobs"
            });
        }

        res.status(200).json(results);
    });
};

const createJob = (req, res) => {
    const { title, company, description, location } = req.body;

    if (!title || !company || !description || !location) {
        return res.status(400).json({
            message: "All job fields are required"
        });
    }

    jobModel.createJob(
        title,
        company,
        description,
        location,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to create job"
                });
            }

            res.status(201).json({
                message: "Job created successfully",
                jobId: result.insertId
            });
        }
    );
};

const searchJobs = (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({
            message: "keyword is required"
        });
    }

    jobModel.searchJobs(keyword, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to search jobs"
            });
        }

        res.status(200).json(results);
    });
};

const getJobById = (req, res) => {
    const jobId = req.params.id;

    jobModel.getJobById(jobId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch job"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

const updateJob = (req, res) => {
    const jobId = req.params.id;
    const { title, company, description, location } = req.body;

    if (!title || !company || !description || !location) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    jobModel.updateJob(
        jobId,
        title,
        company,
        description,
        location,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to update job"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Job not found"
                });
            }

            res.status(200).json({
                message: "Job updated successfully"
            });
        }
    );
};

module.exports = {
    getJobs,
    createJob,
    searchJobs,
    getJobById,
    updateJob
};