const applicationModel = require("../models/applicationModel");

const createApplication = (req, res) => {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
        return res.status(400).json({
            message: "userId and jobId are required"
        });
    }

    applicationModel.createApplication(
        userId,
        jobId,
        (err, result) => {
            if (err) {
                console.error(err);
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
    const { userId } = req.params;

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

module.exports = {
    createApplication,
    getApplicationsByUser
};