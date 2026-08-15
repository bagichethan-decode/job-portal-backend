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

    applicationModel.getApplicationsByUser(
        userId,
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

module.exports = {
    createApplication,
    getApplicationsByUser,
    deleteApplication
};