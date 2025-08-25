// SYNTHIA TOTAL SYSTEM MONITOR
// Monitors GitHub, all services, drives, repos, and functions 24/7
// Auto-recovery and alerting for any failures

const https = require('https');
const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// MONITORING TARGETS
const SERVICES = {
    github: 'https://api.github.com/repos/BCLS-ESQs/ESQs-Platform-MOBILE-ONLINE',
    render: 'https://esqs-platform-mobile-online.onrender.com/health',
    local_main: 'http://localhost:3000',
    local_ai: 'http://localhost:3001', 
    local_synthia: 'http://localhost:3002',
    local_chat: 'http://localhost:3004',
    local_backup: 'http://localhost:8080'
};

const DRIVES = ['F:', 'C:'];
const PROCESSES = ['node', 'powershell'];
const CHECK_INTERVAL = 60000; // 1 minute

let monitoringStats = {
    totalChecks: 0,
    serviceFailures: 0,
    autoFixes: 0,
    lastFullSuccess: null
};

function synthiaLog(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
        info: '\x1b[36m',
        success: '\x1b[32m', 
        error: '\x1b[31m',
        warning: '\x1b[33m',
        critical: '\x1b[41m\x1b[37m'
    };
    console.log(`${colors[type]}[SYNTHIA-MONITOR-${timestamp}] ${message}\x1b[0m`);
}

async function checkService(name, url) {
    return new Promise((resolve) => {
        const isHttps = url.startsWith('https');
        const client = isHttps ? https : http;
        
        const req = client.get(url, { timeout: 10000 }, (res) => {
            resolve({ 
                name, 
                status: 'online', 
                code: res.statusCode,
                healthy: res.statusCode >= 200 && res.statusCode < 400
            });
        });
        
        req.on('timeout', () => {
            req.destroy();
            resolve({ name, status: 'timeout', healthy: false });
        });
        
        req.on('error', (err) => {
            resolve({ name, status: 'error', error: err.message, healthy: false });
        });
        
        req.setTimeout(10000);
    });
}

async function checkDrives() {
    const driveStatus = [];
    
    for (const drive of DRIVES) {
        try {
            const stats = fs.statSync(drive);
            driveStatus.push({ drive, status: 'accessible', healthy: true });
        } catch (error) {
            driveStatus.push({ drive, status: 'error', error: error.message, healthy: false });
        }
    }
    
    return driveStatus;
}

async function checkProcesses() {
    return new Promise((resolve) => {
        exec('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', (error, stdout) => {
            if (error) {
                resolve({ processes: 0, healthy: false, error: error.message });
            } else {
                const lines = stdout.split('\n').filter(line => line.includes('node.exe'));
                resolve({ processes: lines.length - 1, healthy: lines.length > 3 });
            }
        });
    });
}

async function checkRepository() {
    return new Promise((resolve) => {
        exec('git status --porcelain', { cwd: 'F:\\ESQs-Platform-MOBILE-ONLINE' }, (error, stdout) => {
            if (error) {
                resolve({ repo: 'error', healthy: false, error: error.message });
            } else {
                const changes = stdout.trim().split('\n').filter(line => line.trim());
                resolve({ 
                    repo: 'accessible', 
                    healthy: true, 
                    uncommittedChanges: changes.length 
                });
            }
        });
    });
}

async function autoFixService(serviceName) {
    synthiaLog(` AUTO-FIXING ${serviceName.toUpperCase()}`, 'warning');
    monitoringStats.autoFixes++;
    
    switch(serviceName) {
        case 'render':
            // Trigger Render wake-up
            exec('git add . && git commit -m " Synthia auto-fix: Wake up Render" && git push origin main', 
                { cwd: 'F:\\ESQs-Platform-MOBILE-ONLINE' });
            break;
            
        case 'local_main':
            // Restart main service
            exec('Start-Process -WindowStyle Hidden powershell -ArgumentList "-Command", "cd \'F:\\ESQs-Platform-MOBILE-ONLINE\'; node backend-server.js"');
            break;
            
        case 'local_ai':
            // Restart AI bridge
            exec('Start-Process -WindowStyle Hidden powershell -ArgumentList "-Command", "cd \'F:\\ESQs-Platform-MOBILE-ONLINE\'; node ai-synthia-bridge.js"');
            break;
            
        case 'local_synthia':
            // Restart Synthia optimizer
            exec('Start-Process -WindowStyle Hidden powershell -ArgumentList "-Command", "cd \'F:\\ESQs-Platform-MOBILE-ONLINE\'; node synthia-optimizer.js"');
            break;
    }
    
    synthiaLog(` Auto-fix triggered for ${serviceName}`, 'success');
}

async function performFullSystemCheck() {
    monitoringStats.totalChecks++;
    synthiaLog(` FULL SYSTEM CHECK #${monitoringStats.totalChecks}`, 'info');
    
    // Check all services
    const serviceResults = await Promise.all(
        Object.entries(SERVICES).map(([name, url]) => checkService(name, url))
    );
    
    // Check drives
    const driveResults = await checkDrives();
    
    // Check processes
    const processResults = await checkProcesses();
    
    // Check repository
    const repoResults = await checkRepository();
    
    // Analyze results
    const failedServices = serviceResults.filter(s => !s.healthy);
    const failedDrives = driveResults.filter(d => !d.healthy);
    
    if (failedServices.length === 0 && failedDrives.length === 0 && 
        processResults.healthy && repoResults.healthy) {
        monitoringStats.lastFullSuccess = new Date();
        synthiaLog(` ALL SYSTEMS OPERATIONAL - ${serviceResults.length} services online`, 'success');
    } else {
        monitoringStats.serviceFailures++;
        synthiaLog(` SYSTEM ISSUES DETECTED - ${failedServices.length} service failures`, 'error');
        
        // Auto-fix failed services
        for (const service of failedServices) {
            if (service.name !== 'github') { // Don't try to fix GitHub!
                await autoFixService(service.name);
            }
        }
    }
    
    // Detailed reporting every 10 checks
    if (monitoringStats.totalChecks % 10 === 0) {
        synthiaLog(` STATS: ${monitoringStats.totalChecks} checks | ${monitoringStats.serviceFailures} failures | ${monitoringStats.autoFixes} fixes`, 'info');
        
        synthiaLog(' SERVICE STATUS:', 'info');
        serviceResults.forEach(s => {
            const status = s.healthy ? '' : '';
            synthiaLog(`   ${status} ${s.name}: ${s.status}`, s.healthy ? 'success' : 'error');
        });
    }
}

// Initialize monitoring
synthiaLog(' SYNTHIA TOTAL SYSTEM MONITOR STARTING', 'critical');
synthiaLog(' Monitoring: GitHub, Render, Local Services, Drives, Processes, Repository', 'info');
synthiaLog(' Check interval: 1 minute', 'info');
synthiaLog(' Auto-recovery: ENABLED', 'info');
synthiaLog('', 'info');

// Start monitoring
performFullSystemCheck();
setInterval(performFullSystemCheck, CHECK_INTERVAL);

// Graceful shutdown
process.on('SIGINT', () => {
    const uptime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    synthiaLog(' TOTAL SYSTEM MONITOR SHUTTING DOWN', 'warning');
    synthiaLog(` Final: ${monitoringStats.totalChecks} checks | ${uptime}min uptime`, 'info');
    process.exit(0);
});

const startTime = Date.now();
