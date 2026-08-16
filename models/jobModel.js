const db = require("../config/db");

const getAllJobs = (callback) => {
    const sql = "SELECT * FROM jobs ORDER BY created_at DESC";

    db.query(sql, callback);
};

const createJob = (title, company, description, location, callback) => {
    const sql = `
        INSERT INTO jobs (title, company, description, location)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, company, description, location],
        callback
    );
};

const searchJobs = (keyword, callback) => {
    const sql = `
        SELECT * FROM jobs
        WHERE title LIKE ?
        OR company LIKE ?
        OR location LIKE ?
        ORDER BY created_at DESC
    `;

    const searchKeyword = `%${keyword}%`;

    db.query(
        sql,
        [searchKeyword, searchKeyword, searchKeyword],
        callback
    );
};

const getJobById = (jobId, callback) => {
    const sql = `
        SELECT * FROM jobs
        WHERE id = ?
    `;

    db.query(sql, [jobId], callback);
};

const updateJob = (jobId, title, company, description, location, callback) => {
    const sql = `
        UPDATE jobs
        SET title = ?, company = ?, description = ?, location = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, company, description, location, jobId],
        callback
    );
};


module.exports = {
    getAllJobs,
    createJob,
    searchJobs,
    getJobById,
    updateJob
};