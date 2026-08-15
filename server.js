const express = require("express");
const db = require("./config/db");

const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(express.json());

app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Job Portal Backend is running"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});