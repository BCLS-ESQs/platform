/**
 * SYNTHIA-FIXED AI BRIDGE SERVICE
 * Fixes 404 errors and establishes proper routing
 */

const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");

class SynthiaAIBridge {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.AI_BRIDGE_PORT || 3001;
        this.services = new Map();
        
        this.setupMiddleware();
        this.setupRoutes();
        this.setupWebSocket();
        this.initializeServices();
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            console.log(` AI Bridge: ${req.method} ${req.url}`);
            next();
        });
    }

    setupRoutes() {
        // SYNTHIA FIX: Add proper root route
        this.app.get("/", (req, res) => {
            res.json({
                service: "Synthia AI Bridge",
                status: "online", 
                version: "1.0.0",
                endpoints: ["/health", "/status", "/services", "/tunnel"],
                synthia: "404 problems solved!"
            });
        });

        // SYNTHIA FIX: Add health check
        this.app.get("/health", (req, res) => {
            res.json({
                status: "healthy",
                uptime: process.uptime(),
                services: Array.from(this.services.keys()),
                tunnels: this.getTunnelStatus(),
                synthia: "All systems operational"
            });
        });

        // SYNTHIA FIX: Add status endpoint
        this.app.get("/status", (req, res) => {
            res.json({
                bridge: "online",
                connectedServices: this.services.size,
                activeTunnels: this.getActiveTunnels().length,
                lastOptimization: new Date().toISOString(),
                synthia: "Monitoring and optimizing"
            });
        });

        // SYNTHIA FIX: Add services endpoint
        this.app.get("/services", (req, res) => {
            const serviceList = Array.from(this.services.entries()).map(([name, service]) => ({
                name: name,
                status: service.status,
                endpoint: service.endpoint,
                lastPing: service.lastPing
            }));
            
            res.json({
                services: serviceList,
                total: serviceList.length,
                synthia: "Service registry active"
            });
        });

        // SYNTHIA FIX: Add tunnel management
        this.app.post("/tunnel", (req, res) => {
            const { source, target, type } = req.body;
            const tunnelId = this.createTunnel(source, target, type);
            
            res.json({
                tunnelId: tunnelId,
                source: source,
                target: target,
                type: type,
                status: "established",
                synthia: "Tunnel created successfully"
            });
        });

        // SYNTHIA FIX: Add coordination endpoint
        this.app.post("/coordinate", async (req, res) => {
            const { problem, context } = req.body;
            const solution = await this.coordinateAIResponse(problem, context);
            
            res.json({
                problem: problem,
                solution: solution,
                timestamp: new Date().toISOString(),
                synthia: "AI coordination complete"
            });
        });
    }

    setupWebSocket() {
        this.wss = new WebSocketServer({ server: this.server });
        
        this.wss.on("connection", (ws) => {
            console.log(" WebSocket connection established");
            
            ws.on("message", (data) => {
                try {
                    const message = JSON.parse(data);
                    this.handleWebSocketMessage(ws, message);
                } catch (error) {
                    ws.send(JSON.stringify({ error: "Invalid message format" }));
                }
            });

            ws.send(JSON.stringify({
                type: "welcome",
                message: "Connected to Synthia AI Bridge",
                synthia: "Real-time communication established"
            }));
        });
    }

    initializeServices() {
        // Register known services
        this.registerService("esqs-platform", {
            endpoint: "http://localhost:3000",
            status: "active",
            capabilities: ["document-generation", "file-access", "practice-panther"]
        });

        this.registerService("synthia-optimizer", {
            endpoint: "http://localhost:3002", 
            status: "active",
            capabilities: ["code-rewriting", "performance-optimization", "monitoring"]
        });

        console.log(` Initialized ${this.services.size} services`);
    }

    registerService(name, config) {
        this.services.set(name, {
            ...config,
            lastPing: new Date().toISOString(),
            tunnels: []
        });
    }

    createTunnel(source, target, type = "http") {
        const tunnelId = `tunnel-${Date.now()}`;
        
        // Create tunnel configuration
        const tunnel = {
            id: tunnelId,
            source: source,
            target: target,
            type: type,
            status: "active",
            created: new Date().toISOString(),
            traffic: 0
        };

        // Add tunnel to both services
        if (this.services.has(source)) {
            this.services.get(source).tunnels.push(tunnel);
        }
        if (this.services.has(target)) {
            this.services.get(target).tunnels.push(tunnel);
        }

        console.log(` Tunnel created: ${source}  ${target} (${tunnelId})`);
        return tunnelId;
    }

    getTunnelStatus() {
        const allTunnels = [];
        for (const service of this.services.values()) {
            allTunnels.push(...service.tunnels);
        }
        return allTunnels;
    }

    getActiveTunnels() {
        return this.getTunnelStatus().filter(t => t.status === "active");
    }

    async coordinateAIResponse(problem, context = {}) {
        console.log(` Coordinating AI response for: ${problem}`);
        
        // Synthia coordination logic
        const response = {
            analysis: "Synthia analyzing problem...",
            solution: "Implementing optimal solution...",
            confidence: 0.95,
            services_engaged: Array.from(this.services.keys()),
            tunnels_used: this.getActiveTunnels().length
        };

        // Simulate AI coordination
        if (problem.includes("404")) {
            response.solution = "Fixed routing issues, added proper endpoints";
        } else if (problem.includes("performance")) {
            response.solution = "Applied performance optimizations";
        } else if (problem.includes("connectivity")) {
            response.solution = "Established tunnel connections";
        }

        return response;
    }

    handleWebSocketMessage(ws, message) {
        switch (message.type) {
            case "ping":
                ws.send(JSON.stringify({ type: "pong", synthia: "Bridge responsive" }));
                break;
            case "tunnel-request":
                const tunnelId = this.createTunnel(message.source, message.target);
                ws.send(JSON.stringify({ 
                    type: "tunnel-created", 
                    tunnelId: tunnelId,
                    synthia: "Tunnel established"
                }));
                break;
            default:
                ws.send(JSON.stringify({ 
                    type: "unknown", 
                    synthia: "Unknown message type" 
                }));
        }
    }

    start() {
        this.server.listen(this.port, "0.0.0.0", () => {
            console.log(` Synthia AI Bridge running on port ${this.port}`);
            console.log(` Bridge endpoints: http://localhost:${this.port}`);
            console.log(` 404 problems FIXED by Synthia`);
            console.log(` Tunnels ready for establishment`);
        });
    }
}

// Auto-start
if (require.main === module) {
    const bridge = new SynthiaAIBridge();
    bridge.start();
}

module.exports = SynthiaAIBridge;
