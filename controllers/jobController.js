const jobModel = require("../models/jobModel");

const getJobs = (req, res) => {
    const { location, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({
            message: "Page must be a positive number"
        });
    }

    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
        return res.status(400).json({
            message: "Limit must be between 1 and 100"
        });
    }

    jobModel.getJobsWithFilters(
        location,
        pageNumber,
        limitNumber,
        (err, results) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to fetch jobs"
                });
            }

            res.status(200).json({
                page: pageNumber,
                limit: limitNumber,
                count: results.length,
                jobs: results
            });
        }
    );
};

const createJob = (req, res) => {
    const { title, company, description, location } = req.body;

    if (!title || !company || !description || !location) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const employerId = req.user.userId;

    jobModel.createJob(
        employerId,
        title,
        company,
        description,
        location,
        (err, result) => {
            if (err) {
                console.error("CREATE JOB DATABASE ERROR:", err);

                return res.status(500).json({
                    message: "Failed to create job",
                    error: err.message,
                    code: err.code
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
    const keyword = req.query.keyword;

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
    const employerId = req.user.userId;

    const {
        title,
        company,
        description,
        location
    } = req.body;

    if (!title || !company || !description || !location) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    jobModel.updateJob(
        jobId,
        employerId,
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
                    message: "Job not found or you do not own this job"
                });
            }

            res.status(200).json({
                message: "Job updated successfully"
            });
        }
    );
};

const deleteJob = (req, res) => {
    const jobId = req.params.id;
    const employerId = req.user.userId;

    jobModel.deleteJob(
        jobId,
        employerId,
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(409).json({
                    message: "Cannot delete job because applications exist for this job"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Job not found or you do not own this job"
                });
            }

            res.status(200).json({
                message: "Job deleted successfully"
            });
        }
    );
};

module.exports = {
    getJobs,
    createJob,
    searchJobs,
    getJobById,
    updateJob,
    deleteJob
};