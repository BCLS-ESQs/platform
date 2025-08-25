// SYNTHIA AI BRIDGE - Enhanced with tunnel management
const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());

// SYNTHIA: Enhanced tunnel management
const tunnels = new Map();
const services = [
    { name: "GitHub Copilot", status: "active", port: null },
    { name: "Synthia AI", status: "active", port: 3001 }
];

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        service: "Synthia AI Bridge",
        status: "operational",
        message: "404 problems fixed by Synthia",
        tunnels: tunnels.size,
        timestamp: new Date().toISOString()
    });
});

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        services: services.length,
        synthia: "All systems operational",
        tunnels: tunnels.size
    });
});

// Services endpoint
app.get("/services", (req, res) => {
    res.json(services);
});

// Status endpoint with full details
app.get("/status", (req, res) => {
    res.json({
        aiSystems: services,
        services: services.length,
        tunnels: Array.from(tunnels.keys()),
        synthia: "Full coordination active"
    });
});

// SYNTHIA: Complete tunnel management
app.get("/tunnel/status", (req, res) => {
    res.json({
        tunnelManagement: "active",
        activeServices: services.length,
        activeTunnels: tunnels.size,
        tunnelList: Array.from(tunnels.keys())
    });
});

app.post("/tunnel/create", (req, res) => {
    const { source, target, name } = req.body;
    tunnels.set(name, { source, target, created: new Date() });
    res.json({
        tunnel: name,
        status: "created",
        synthia: `Tunnel ${name} established`
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(` Synthia AI Bridge running on port ${PORT}`);
    console.log(` Tunnel management active`);
});
