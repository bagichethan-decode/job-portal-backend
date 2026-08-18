const db = require("../config/db");

const getAllJobs = (callback) => {
    const sql = "SELECT * FROM jobs";

    db.query(sql, callback);
};

const getJobsWithFilters = (location, page, limit, callback) => {
    const offset = (page - 1) * limit;

    let sql = `
        SELECT *
        FROM jobs
    `;

    const values = [];

    if (location) {
        sql += ` WHERE location LIKE ?`;
        values.push(`%${location}%`);
    }

    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;

    values.push(limit, offset);

    db.query(sql, values, callback);
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
        SELECT *
        FROM jobs
        WHERE title LIKE ?
        OR company LIKE ?
        OR location LIKE ?
    `;

    const searchValue = `%${keyword}%`;

    db.query(
        sql,
        [searchValue, searchValue, searchValue],
        callback
    );
};

const getJobById = (jobId, callback) => {
    const sql = `
        SELECT *
        FROM jobs
        WHERE id = ?
    `;

    db.query(sql, [jobId], callback);
};

const updateJob = (
    jobId,
    title,
    company,
    description,
    location,
    callback
) => {
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

const deleteJob = (jobId, callback) => {
    const sql = `
        DELETE FROM jobs
        WHERE id = ?
    `;

    db.query(sql, [jobId], callback);
};

module.exports = {
    getAllJobs,
    getJobsWithFilters,
    createJob,
    searchJobs,
    getJobById,
    updateJob,
    deleteJob
};