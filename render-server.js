// RENDER-OPTIMIZED SERVER - Fixed for cloud deployment
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Essential middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Render health check (required)
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ESQs Platform Mobile Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f0f8ff; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            h1 { color: #2c5aa0; }
            .status { background: #e7f5e7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1> ESQs Platform Mobile Online</h1>
            <div class="status">
                <h3> Synthia AI Deployment Active</h3>
                <p><strong>Status:</strong> Operational</p>
                <p><strong>Deployment:</strong> Render.com</p>
                <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            </div>
            
            <h3> User Access Links:</h3>
            <p><a href="/jessica">Jessica</a>  <a href="/jo">Jo</a>  <a href="/john">John</a>  <a href="/jordan">Jordan</a>  <a href="/travis">Travis</a></p>
            
            <h3> API Endpoints:</h3>
            <p><a href="/health">Health Check</a>  <a href="/api/status">API Status</a></p>
            
            <p style="margin-top: 40px;"><em>Powered by Synthia AI</em></p>
        </div>
    </body>
    </html>
    `);
});

// Health endpoint (Render requirement)
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "ESQs Platform Mobile Online",
        synthia: "Cloud deployment successful",
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// API status
app.get("/api/status", (req, res) => {
    res.json({
        platform: "ESQs Mobile Online",
        version: "2.0.0", 
        synthia: "AI optimization active",
        deployment: "render.com"
    });
});

// User routes
app.get("/jessica", (req, res) => res.sendFile(path.join(__dirname, "jessica.html")));
app.get("/jo", (req, res) => res.sendFile(path.join(__dirname, "jo.html")));
app.get("/john", (req, res) => res.sendFile(path.join(__dirname, "john.html")));
app.get("/jordan", (req, res) => res.sendFile(path.join(__dirname, "jordan.html")));
app.get("/travis", (req, res) => res.sendFile(path.join(__dirname, "travis.html")));

// Error handling
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error", synthia: "Error handled gracefully" });
});

// CRITICAL: Must bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
    console.log(` ESQs Platform running on port ${PORT}`);
    console.log(` Render deployment ready`);
});
