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

const getApplicationsByUser = (userId, callback) => {
    const sql = `
        SELECT 
            applications.id,
            applications.user_id,
            applications.job_id,
            applications.applied_at,
            jobs.title,
            jobs.company,
            jobs.location
        FROM applications
        JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.user_id = ?
        ORDER BY applications.applied_at DESC
    `;

    db.query(sql, [userId], callback);
};

module.exports = {
    createApplication,
    getApplicationsByUser
};