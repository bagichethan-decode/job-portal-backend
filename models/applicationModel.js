const db = require("../config/db");

const createApplication = (userId, jobId, callback) => {
    const sql = `
        INSERT INTO applications (user_id, job_id)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [userId, jobId],
        callback
    );
};
const getApplicationsByUser = (userId, status, callback) => {
    let sql = `
        SELECT 
            applications.id,
            applications.user_id,
            applications.job_id,
            applications.applied_at,
            applications.status,
            jobs.title,
            jobs.company,
            jobs.location
        FROM applications
        JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.user_id = ?
    `;

    const values = [userId];

    if (status) {
        sql += ` AND applications.status = ?`;
        values.push(status);
    }

    sql += ` ORDER BY applications.applied_at DESC`;

    db.query(sql, values, callback);
};

const deleteApplication = (applicationId, userId, callback) => {
    const sql = `
        DELETE FROM applications
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [applicationId, userId],
        callback
    );
};

const getApplicationById = (applicationId, userId, callback) => {
    const sql = `
        SELECT 
            applications.id,
            applications.user_id,
            applications.job_id,
            applications.applied_at,
            applications.status,
            jobs.title,
            jobs.company,
            jobs.location
        FROM applications
        JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.id = ?
        AND applications.user_id = ?
    `;

    db.query(
        sql,
        [applicationId, userId],
        callback
    );
};

const updateApplicationStatus = (
    applicationId,
    userId,
    status,
    callback
) => {
    const sql = `
        UPDATE applications
        SET status = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [status, applicationId, userId],
        callback
    );
};

module.exports = {
    createApplication,
    getApplicationsByUser,
    deleteApplication,
    getApplicationById,
    updateApplicationStatus
};