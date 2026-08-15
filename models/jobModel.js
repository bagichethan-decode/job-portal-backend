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

module.exports = {
    getAllJobs,
    createJob
};