const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class ServiceManager {
    constructor() {
        this.services = {
            backend: {
                name: 'Backend Server',
                script: 'backend-server.js',
                port: 3000,
                process: null,
                status: 'stopped',
                restartCount: 0,
                maxRestarts: 5,
                healthCheckUrl: 'http://localhost:3000/api/health'
            },
            bridge: {
                name: 'AI-Synthia Bridge',
                script: 'ai-synthia-bridge.js',
                port: 3001,
                process: null,
                status: 'stopped',
                restartCount: 0,
                maxRestarts: 5,
                healthCheckUrl: 'http://localhost:3001/ai/status'
            },
            synthia: {
                name: 'Synthia Integration',
                script: 'synthia-integration.js',
                port: 3002,
                process: null,
                status: 'stopped',
                restartCount: 0,
                maxRestarts: 5,
                healthCheckUrl: 'http://localhost:3002/synthia/health'
            }
        };
        
        this.monitoringInterval = null;
        this.healthCheckInterval = null;
        this.startupDelay = 2000; // 2 seconds between service starts
        
        this.init();
    }

    async init() {
        console.log('🚀 ESQs Platform Service Manager Initializing...');
        
        // Start all services
        await this.startAllServices();
        
        // Start monitoring
        this.startMonitoring();
        
        // Start health checks
        this.startHealthChecks();
        
        console.log('✅ Service Manager initialized and monitoring all services');
    }

    async startAllServices() {
        console.log('🔄 Starting all services...');
        
        for (const [key, service] of Object.entries(this.services)) {
            await this.startService(key);
            await this.delay(this.startupDelay);
        }
    }

    async startService(serviceKey) {
        const service = this.services[serviceKey];
        
        if (service.process && service.process.exitCode === null) {
            console.log(`⚠️ ${service.name} is already running`);
            return;
        }

        try {
            console.log(`🚀 Starting ${service.name}...`);
            
            service.process = spawn('node', [service.script], {
                stdio: 'pipe',
                cwd: process.cwd()
            });

            service.status = 'starting';
            service.startTime = new Date();

            // Handle process events
            service.process.on('error', (error) => {
                console.error(`❌ ${service.name} failed to start:`, error.message);
                service.status = 'error';
                this.handleServiceFailure(serviceKey, error);
            });

            service.process.on('exit', (code, signal) => {
                console.log(`⚠️ ${service.name} exited with code ${code} and signal ${signal}`);
                service.status = 'stopped';
                service.process = null;
                
                if (code !== 0) {
                    this.handleServiceFailure(serviceKey, new Error(`Process exited with code ${code}`));
                }
            });

            service.process.on('close', (code) => {
                console.log(`🔒 ${service.name} closed with code ${code}`);
                service.status = 'stopped';
                service.process = null;
            });

            // Wait for service to be ready
            await this.waitForServiceReady(serviceKey);
            
            service.status = 'running';
            service.restartCount = 0;
            console.log(`✅ ${service.name} started successfully on port ${service.port}`);

        } catch (error) {
            console.error(`❌ Failed to start ${service.name}:`, error.message);
            service.status = 'error';
            this.handleServiceFailure(serviceKey, error);
        }
    }

    async waitForServiceReady(serviceKey, maxAttempts = 30) {
        const service = this.services[serviceKey];
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const response = await fetch(service.healthCheckUrl);
                if (response.ok) {
                    return true;
                }
            } catch (error) {
                // Service not ready yet
            }

            await this.delay(1000);
            attempts++;
        }

        throw new Error(`${service.name} failed to become ready after ${maxAttempts} attempts`);
    }

    async handleServiceFailure(serviceKey, error) {
        const service = this.services[serviceKey];
        
        console.error(`❌ ${service.name} failed:`, error.message);
        
        if (service.restartCount < service.maxRestarts) {
            service.restartCount++;
            console.log(`🔄 Restarting ${service.name} (attempt ${service.restartCount}/${service.maxRestarts})...`);
            
            // Wait before restarting
            await this.delay(5000);
            
            try {
                await this.startService(serviceKey);
            } catch (restartError) {
                console.error(`❌ Failed to restart ${service.name}:`, restartError.message);
            }
        } else {
            console.error(`💀 ${service.name} exceeded maximum restart attempts. Manual intervention required.`);
            service.status = 'failed';
            
            // Send alert
            await this.sendAlert(service, error);
        }
    }

    async restartService(serviceKey) {
        const service = this.services[serviceKey];
        
        if (service.process) {
            console.log(`🔄 Manually restarting ${service.name}...`);
            service.process.kill('SIGTERM');
            await this.delay(2000);
        }
        
        service.restartCount = 0;
        await this.startService(serviceKey);
    }

    startMonitoring() {
        this.monitoringInterval = setInterval(() => {
            this.checkServiceStatus();
        }, 10000); // Check every 10 seconds
    }

    startHealthChecks() {
        this.healthCheckInterval = setInterval(async () => {
            await this.performHealthChecks();
        }, 30000); // Health check every 30 seconds
    }

    async checkServiceStatus() {
        for (const [key, service] of Object.entries(this.services)) {
            if (service.status === 'running' && service.process) {
                // Check if process is still alive
                if (service.process.exitCode !== null) {
                    console.log(`⚠️ ${service.name} process died unexpectedly`);
                    service.status = 'stopped';
                    service.process = null;
                    this.handleServiceFailure(key, new Error('Process died unexpectedly'));
                }
            }
        }
    }

    async performHealthChecks() {
        console.log('🏥 Performing health checks...');
        
        for (const [key, service] of Object.entries(this.services)) {
            if (service.status === 'running') {
                try {
                    const response = await fetch(service.healthCheckUrl);
                    if (!response.ok) {
                        console.warn(`⚠️ ${service.name} health check failed: ${response.status}`);
                        this.handleServiceFailure(key, new Error(`Health check failed: ${response.status}`));
                    }
                } catch (error) {
                    console.warn(`⚠️ ${service.name} health check error:`, error.message);
                    this.handleServiceFailure(key, error);
                }
            }
        }
    }

    async sendAlert(service, error) {
        // This would send an email or notification
        console.error(`🚨 ALERT: ${service.name} is down and requires manual intervention!`);
        console.error(`   Error: ${error.message}`);
        console.error(`   Port: ${service.port}`);
        console.error(`   Restart attempts: ${service.restartCount}`);
    }

    getServiceStatus() {
        const status = {};
        
        for (const [key, service] of Object.entries(this.services)) {
            status[key] = {
                name: service.name,
                status: service.status,
                port: service.port,
                restartCount: service.restartCount,
                uptime: service.startTime ? Date.now() - service.startTime.getTime() : 0
            };
        }
        
        return status;
    }

    async stopAllServices() {
        console.log('🛑 Stopping all services...');
        
        for (const [key, service] of Object.entries(this.services)) {
            if (service.process) {
                service.process.kill('SIGTERM');
                service.status = 'stopping';
            }
        }
        
        // Wait for services to stop
        await this.delay(5000);
        
        // Force kill if still running
        for (const [key, service] of Object.entries(this.services)) {
            if (service.process) {
                service.process.kill('SIGKILL');
                service.status = 'stopped';
                service.process = null;
            }
        }
        
        console.log('✅ All services stopped');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Graceful shutdown
    async shutdown() {
        console.log('🔄 Service Manager shutting down...');
        
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        
        await this.stopAllServices();
        console.log('✅ Service Manager shutdown complete');
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    console.log('\n🔄 Received SIGINT, shutting down gracefully...');
    if (global.serviceManager) {
        await global.serviceManager.shutdown();
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🔄 Received SIGTERM, shutting down gracefully...');
    if (global.serviceManager) {
        await global.serviceManager.shutdown();
    }
    process.exit(0);
});

// Initialize service manager
const serviceManager = new ServiceManager();
global.serviceManager = serviceManager;

// Export for use in other modules
module.exports = ServiceManager;
