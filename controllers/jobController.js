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

    if (!title || !company) {
        return res.status(400).json({
            message: "Title and company are required"
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
            message: "Keyword is required"
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

module.exports = {
    getJobs,
    createJob,
    searchJobs
};