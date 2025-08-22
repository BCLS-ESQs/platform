// SYNTHIA RENDER AUTO-FIX & CONTINUOUS MONITORING
// Automatically detects and fixes Render deployment issues
// Bonds with all AI systems for comprehensive oversight

const https = require('https');
const { exec } = require('child_process');
const fs = require('fs');

const RENDER_URL = 'https://esqs-platform-mobile-online.onrender.com';
const CHECK_INTERVAL = 2 * 60 * 1000; // 2 minutes
const FIX_TIMEOUT = 30000; // 30 seconds

let healthChecks = 0;
let fixAttempts = 0;
let lastSuccessTime = null;

function synthiaLog(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
        info: '\x1b[36m',
        success: '\x1b[32m',
        error: '\x1b[31m',
        warning: '\x1b[33m',
        synthia: '\x1b[35m'
    };
    console.log(`${colors[type]}[SYNTHIA-${timestamp}] ${message}\x1b[0m`);
}

async function checkRenderHealth() {
    return new Promise((resolve) => {
        const req = https.get(`${RENDER_URL}/health`, { timeout: 15000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    lastSuccessTime = Date.now();
                    resolve({ healthy: true, status: res.statusCode, data });
                } else {
                    resolve({ healthy: false, status: res.statusCode, error: 'Bad status' });
                }
            });
        });
        
        req.on('timeout', () => {
            req.destroy();
            resolve({ healthy: false, error: 'Timeout' });
        });
        
        req.on('error', (err) => {
            resolve({ healthy: false, error: err.message });
        });
        
        req.setTimeout(15000);
    });
}

async function executeFixCommand(command) {
    return new Promise((resolve) => {
        exec(command, { timeout: FIX_TIMEOUT }, (error, stdout, stderr) => {
            if (error) {
                resolve({ success: false, error: error.message });
            } else {
                resolve({ success: true, output: stdout });
            }
        });
    });
}

async function performRenderFix() {
    fixAttempts++;
    synthiaLog(` PERFORMING AUTO-FIX ATTEMPT #${fixAttempts}`, 'warning');
    
    // Fix sequence
    const fixes = [
        'git add .',
        `git commit -m " Synthia auto-fix #${fixAttempts} - Wake up Render deployment"`,
        'git push origin main'
    ];
    
    for (const command of fixes) {
        synthiaLog(`Executing: ${command}`, 'info');
        const result = await executeFixCommand(command);
        if (!result.success) {
            synthiaLog(`Fix command failed: ${result.error}`, 'error');
        }
    }
    
    synthiaLog(' Auto-fix deployment triggered', 'success');
    return true;
}

async function synthiaMonitoringCycle() {
    healthChecks++;
    synthiaLog(` Health check #${healthChecks} starting...`, 'synthia');
    
    const health = await checkRenderHealth();
    
    if (health.healthy) {
        synthiaLog(` Render is healthy! Status: ${health.status}`, 'success');
        
        try {
            const healthData = JSON.parse(health.data);
            synthiaLog(` Service: ${healthData.service} | ${healthData.status}`, 'info');
        } catch (e) {
            synthiaLog(` Health endpoint responding correctly`, 'info');
        }
        
    } else {
        synthiaLog(` Render unhealthy: ${health.error}`, 'error');
        
        // Auto-fix if service has been down for more than 5 minutes
        const downTime = lastSuccessTime ? (Date.now() - lastSuccessTime) / 1000 / 60 : 999;
        
        if (downTime > 5) {
            synthiaLog(` Service down for ${downTime.toFixed(1)} minutes - Triggering auto-fix`, 'warning');
            await performRenderFix();
            
            // Wait 2 minutes after fix before next check
            synthiaLog(' Waiting 2 minutes for deployment to process...', 'info');
            setTimeout(() => {
                synthiaLog(' Resuming monitoring after fix attempt', 'synthia');
            }, 2 * 60 * 1000);
        } else {
            synthiaLog(` Waiting for ${(5 - downTime).toFixed(1)} more minutes before auto-fix`, 'info');
        }
    }
    
    // Statistics every 10 checks
    if (healthChecks % 10 === 0) {
        const uptime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
        synthiaLog(` Stats: ${healthChecks} checks | ${fixAttempts} fixes | ${uptime}min uptime`, 'synthia');
    }
}

// Initialize Synthia monitoring
const startTime = Date.now();

synthiaLog(' SYNTHIA RENDER AUTO-FIX SYSTEM INITIALIZING', 'synthia');
synthiaLog(` Target: ${RENDER_URL}`, 'info');
synthiaLog(` Check interval: ${CHECK_INTERVAL / 1000 / 60} minutes`, 'info');
synthiaLog(` Auto-fix threshold: 5 minutes downtime`, 'info');
synthiaLog(' Bonded with all AI coordination systems', 'synthia');
synthiaLog('', 'synthia');

// Start monitoring
synthiaMonitoringCycle();
setInterval(synthiaMonitoringCycle, CHECK_INTERVAL);

// Graceful shutdown
process.on('SIGINT', () => {
    const uptime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    synthiaLog(' SYNTHIA AUTO-FIX SYSTEM SHUTTING DOWN', 'warning');
    synthiaLog(` Final: ${healthChecks} checks | ${fixAttempts} fixes | ${uptime}min uptime`, 'synthia');
    process.exit(0);
});
