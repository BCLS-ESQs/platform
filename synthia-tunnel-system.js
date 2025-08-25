/**
 * SYNTHIA SERVICE TUNNEL SYSTEM
 * Creates persistent tunnels between all services
 */

const http = require("http");
const https = require("https");
const { EventEmitter } = require("events");

class SynthiaTunnelSystem extends EventEmitter {
    constructor() {
        super();
        this.tunnels = new Map();
        this.services = new Map();
        this.healthChecks = new Map();
        this.retryAttempts = 3;
        this.retryDelay = 2000;
        
        this.initializeServices();
        this.startHealthMonitoring();
    }

    initializeServices() {
        console.log(" SYNTHIA INITIALIZING SERVICE TUNNELS...");
        
        // Define all service endpoints
        const services = [
            { name: "esqs-platform", url: "http://localhost:3000", type: "local" },
            { name: "ai-bridge", url: "http://localhost:3001", type: "local" },
            { name: "synthia-optimizer", url: "http://localhost:3002", type: "local" },
            { name: "render-esqs", url: "https://esqs-backend.onrender.com", type: "cloud" },
            { name: "github-repo", url: "https://api.github.com", type: "external" }
        ];

        services.forEach(service => {
            this.registerService(service.name, service.url, service.type);
        });

        console.log(` Registered ${services.length} services for tunneling`);
    }

    registerService(name, url, type) {
        this.services.set(name, {
            name: name,
            url: url,
            type: type,
            status: "unknown",
            lastCheck: null,
            tunnels: []
        });
    }

    async createTunnel(sourceService, targetService, options = {}) {
        const tunnelId = `tunnel-${sourceService}-${targetService}-${Date.now()}`;
        
        console.log(` Creating tunnel: ${sourceService}  ${targetService}`);
        
        const source = this.services.get(sourceService);
        const target = this.services.get(targetService);

        if (!source || !target) {
            throw new Error(`Service not found: ${sourceService} or ${targetService}`);
        }

        const tunnel = {
            id: tunnelId,
            source: sourceService,
            target: targetService,
            sourceUrl: source.url,
            targetUrl: target.url,
            status: "connecting",
            created: new Date().toISOString(),
            lastUsed: null,
            traffic: 0,
            errors: 0,
            options: options
        };

        try {
            // Test tunnel connectivity
            await this.testTunnelConnection(tunnel);
            tunnel.status = "active";
            console.log(` Tunnel established: ${tunnelId}`);
        } catch (error) {
            tunnel.status = "failed";
            tunnel.error = error.message;
            console.log(` Tunnel failed: ${tunnelId} - ${error.message}`);
        }

        this.tunnels.set(tunnelId, tunnel);
        
        // Add tunnel references to services
        source.tunnels.push(tunnelId);
        target.tunnels.push(tunnelId);

        this.emit("tunnel-created", tunnel);
        return tunnel;
    }

    async testTunnelConnection(tunnel) {
        console.log(` Testing tunnel: ${tunnel.source}  ${tunnel.target}`);
        
        const isHttps = tunnel.targetUrl.startsWith("https");
        const client = isHttps ? https : http;
        
        return new Promise((resolve, reject) => {
            const options = {
                method: "HEAD",
                timeout: 5000
            };

            const req = client.request(tunnel.targetUrl, options, (res) => {
                if (res.statusCode < 400) {
                    resolve(true);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });

            req.on("timeout", () => {
                req.destroy();
                reject(new Error("Connection timeout"));
            });

            req.on("error", (error) => {
                reject(error);
            });

            req.end();
        });
    }

    async createAllTunnels() {
        console.log(" SYNTHIA CREATING ALL SERVICE TUNNELS...");
        
        const serviceNames = Array.from(this.services.keys());
        const tunnelPromises = [];

        // Create tunnels between all services
        for (let i = 0; i < serviceNames.length; i++) {
            for (let j = i + 1; j < serviceNames.length; j++) {
                const source = serviceNames[i];
                const target = serviceNames[j];
                
                // Bidirectional tunnels
                tunnelPromises.push(this.createTunnel(source, target));
                tunnelPromises.push(this.createTunnel(target, source));
            }
        }

        const results = await Promise.allSettled(tunnelPromises);
        const successful = results.filter(r => r.status === "fulfilled").length;
        const failed = results.filter(r => r.status === "rejected").length;

        console.log(` Tunnel creation complete: ${successful} successful, ${failed} failed`);
        return { successful, failed, total: results.length };
    }

    async routeThroughTunnel(sourceService, targetService, request) {
        const tunnelId = this.findTunnel(sourceService, targetService);
        
        if (!tunnelId) {
            throw new Error(`No tunnel found: ${sourceService}  ${targetService}`);
        }

        const tunnel = this.tunnels.get(tunnelId);
        
        if (tunnel.status !== "active") {
            throw new Error(`Tunnel not active: ${tunnelId}`);
        }

        try {
            const response = await this.makeRequest(tunnel.targetUrl, request);
            
            // Update tunnel stats
            tunnel.lastUsed = new Date().toISOString();
            tunnel.traffic++;
            
            console.log(` Routed through tunnel: ${tunnelId}`);
            return response;
            
        } catch (error) {
            tunnel.errors++;
            console.log(` Tunnel error: ${tunnelId} - ${error.message}`);
            throw error;
        }
    }

    findTunnel(sourceService, targetService) {
        for (const [tunnelId, tunnel] of this.tunnels) {
            if (tunnel.source === sourceService && tunnel.target === targetService) {
                return tunnelId;
            }
        }
        return null;
    }

    async makeRequest(url, request) {
        const isHttps = url.startsWith("https");
        const client = isHttps ? https : http;
        
        return new Promise((resolve, reject) => {
            const options = {
                method: request.method || "GET",
                headers: request.headers || {},
                timeout: 10000
            };

            const req = client.request(url, options, (res) => {
                let data = "";
                res.on("data", chunk => data += chunk);
                res.on("end", () => {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: data
                    });
                });
            });

            req.on("timeout", () => {
                req.destroy();
                reject(new Error("Request timeout"));
            });

            req.on("error", reject);

            if (request.body) {
                req.write(request.body);
            }
            
            req.end();
        });
    }

    startHealthMonitoring() {
        console.log(" Starting tunnel health monitoring...");
        
        setInterval(async () => {
            await this.checkAllTunnels();
        }, 30000); // Check every 30 seconds
    }

    async checkAllTunnels() {
        console.log(" Checking tunnel health...");
        
        const checks = Array.from(this.tunnels.values()).map(async (tunnel) => {
            try {
                await this.testTunnelConnection(tunnel);
                if (tunnel.status !== "active") {
                    tunnel.status = "active";
                    console.log(` Tunnel restored: ${tunnel.id}`);
                }
            } catch (error) {
                if (tunnel.status === "active") {
                    tunnel.status = "failed";
                    tunnel.error = error.message;
                    console.log(` Tunnel failed: ${tunnel.id} - ${error.message}`);
                }
            }
        });

        await Promise.allSettled(checks);
    }

    getTunnelStats() {
        const stats = {
            total: this.tunnels.size,
            active: 0,
            failed: 0,
            traffic: 0,
            errors: 0
        };

        for (const tunnel of this.tunnels.values()) {
            if (tunnel.status === "active") stats.active++;
            if (tunnel.status === "failed") stats.failed++;
            stats.traffic += tunnel.traffic;
            stats.errors += tunnel.errors;
        }

        return stats;
    }

    listTunnels() {
        return Array.from(this.tunnels.values()).map(tunnel => ({
            id: tunnel.id,
            route: `${tunnel.source}  ${tunnel.target}`,
            status: tunnel.status,
            traffic: tunnel.traffic,
            lastUsed: tunnel.lastUsed
        }));
    }
}

// Auto-start
if (require.main === module) {
    console.log(" STARTING SYNTHIA TUNNEL SYSTEM...");
    
    const tunnelSystem = new SynthiaTunnelSystem();
    
    // Create all tunnels
    tunnelSystem.createAllTunnels()
        .then(results => {
            console.log(` Synthia tunnel system active!`);
            console.log(` ${results.successful} tunnels established`);
            
            // Log status every minute
            setInterval(() => {
                const stats = tunnelSystem.getTunnelStats();
                console.log(` Tunnels: ${stats.active}/${stats.total} active, ${stats.traffic} requests`);
            }, 60000);
        });
}

module.exports = SynthiaTunnelSystem;
