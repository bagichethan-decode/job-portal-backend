const applicationModel = require("../models/applicationModel");

const createApplication = (req, res) => {
    const { jobId } = req.body;
    const userId = req.user.userId;

    if (!jobId) {
        return res.status(400).json({
            message: "jobId is required"
        });
    }

    applicationModel.createApplication(
        userId,
        jobId,
        (err, result) => {
            if (err) {
                console.error(err);

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "You have already applied for this job"
                    });
                }

                return res.status(500).json({
                    message: "Failed to create application"
                });
            }

            res.status(201).json({
                message: "Application submitted successfully",
                applicationId: result.insertId
            });
        }
    );
};

const getApplicationsByUser = (req, res) => {
    const userId = req.user.userId;
    const status = req.query.status;

    applicationModel.getApplicationsByUser(
        userId,
        status,
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to fetch applications"
                });
            }

            res.status(200).json(results);
        }
    );
};

const deleteApplication = (req, res) => {
    const applicationId = req.params.id;
    const userId = req.user.userId;

    applicationModel.deleteApplication(
        applicationId,
        userId,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to delete application"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Application not found"
                });
            }

            res.status(200).json({
                message: "Application deleted successfully"
            });
        }
    );
};

const getApplicationById = (req, res) => {
    const applicationId = req.params.id;
    const userId = req.user.userId;

    applicationModel.getApplicationById(
        applicationId,
        userId,
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to fetch application"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Application not found"
                });
            }

            res.status(200).json(results[0]);
        }
    );
};


const updateApplicationStatus = (req, res) => {
    const applicationId = req.params.id;
    const userId = req.user.userId;
    const { status } = req.body;

    const allowedStatuses = [
        "APPLIED",
        "SHORTLISTED",
        "INTERVIEW",
        "REJECTED",
        "OFFERED"
    ];

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid application status"
        });
    }

    applicationModel.updateApplicationStatus(
        applicationId,
        userId,
        status,
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to update application status"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Application not found"
                });
            }

            res.status(200).json({
                message: "Application status updated successfully",
                status: status
            });
        }
    );
};

const getApplicationStats = (req, res) => {
    const userId = req.user.userId;

    applicationModel.getApplicationStats(
        userId,
        (err, results) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to fetch application statistics"
                });
            }

            const stats = {
                APPLIED: 0,
                SHORTLISTED: 0,
                INTERVIEW: 0,
                REJECTED: 0,
                OFFERED: 0
            };

            results.forEach((row) => {
                stats[row.status] = row.count;
            });

            res.status(200).json(stats);
        }
    );
};


module.exports = {
    createApplication,
    getApplicationsByUser,
    deleteApplication,
    getApplicationById,
    updateApplicationStatus,
    getApplicationStats
};