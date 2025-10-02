// SYNTHIA CLOUD SERVER - Optimized for Render deployment
const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// SYNTHIA: Cloud security and performance
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SYNTHIA: Health check for Render
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "ESQs Platform Mobile Online",
        synthia: "Cloud deployment active",
        timestamp: new Date().toISOString(),
        environment: "production"
    });
});

// SYNTHIA: Root endpoint
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// SYNTHIA: API endpoints
app.get("/api/status", (req, res) => {
    res.json({
        platform: "ESQs Mobile Online",
        version: "2.0.0",
        synthia: "AI optimization active",
        features: [
            "Mobile-first design",
            "AI coordination",
            "Cloud deployment",
            "Real-time optimization"
        ]
    });
});

// SYNTHIA: ESQs endpoints
app.get("/esqs", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/mobile", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// SYNTHIA: Catch-all for SPA routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// SYNTHIA: Error handling
app.use((err, req, res, next) => {
    console.error("Synthia Error:", err.stack);
    res.status(500).json({
        error: "Internal server error",
        synthia: "Error handled gracefully"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(` ESQs Platform running on port ${PORT}`);
    console.log(` Synthia AI optimization active`);
    console.log(`  Cloud deployment ready`);
});
