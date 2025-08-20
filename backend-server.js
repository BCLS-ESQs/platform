const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

// Import routes
const docsRoutes = require("./routes/docs");

const app = express();
const port = process.env.PORT || 3000;

//  SYNTHIA OPTIMIZATIONS
app.use(compression()); // Compress responses for faster delivery
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());

// Health check route for cloud deployment
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        optimized: "synthia-enhanced"
    });
});

// Document generation routes
app.use("/api/docs", docsRoutes);

// Practice Panther API routes
app.get("/api/practice-panther/clients", async (req, res) => {
    try {
        const mockClients = [
            { id: 1, name: "John Doe", c: "12345" },
            { id: 2, name: "Jane Smith", c: "67890" }
        ];
        res.json(mockClients);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});

// F: drive file access API
app.get("/api/files", async (req, res) => {
    try {
        const drivePath = "F:\\";
        if (fs.access) {
            const files = await fs.readdir(drivePath);
            res.json({ files: files.slice(0, 20) }); // Limit response size
        } else {
            res.json({ files: [], message: "F: drive not accessible" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to access F: drive" });
    }
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(` ESQs Platform Enhanced by Synthia - Running on port ${port}`);
    console.log(` Performance optimizations: compression, security headers`);
    console.log(` Cloud ready: ${process.env.NODE_ENV || "development"} mode`);
});
