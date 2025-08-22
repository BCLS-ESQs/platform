// RENDER KEEP-ALIVE SERVICE
// Pings Render every 14 minutes to prevent free tier sleep
// Runs 24/7 to maintain cloud deployment uptime

const https = require('https');

const RENDER_URL = 'https://esqs-platform-mobile-online.onrender.com';
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds
const HEALTH_ENDPOINT = '/health';

let pingCount = 0;
let successCount = 0;
let errorCount = 0;

function logStatus(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
        info: '\x1b[36m',    // Cyan
        success: '\x1b[32m', // Green
        error: '\x1b[31m',   // Red
        warning: '\x1b[33m'  // Yellow
    };
    const reset = '\x1b[0m';
    
    console.log(`${colors[type]}[${timestamp}] ${message}${reset}`);
}

function pingRender() {
    return new Promise((resolve, reject) => {
        const url = `${RENDER_URL}${HEALTH_ENDPOINT}`;
        
        const req = https.get(url, { timeout: 10000 }, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode === 200) {
                    successCount++;
                    logStatus(` Render responded! Status: ${res.statusCode} | Success: ${successCount}/${pingCount}`, 'success');
                    resolve({ success: true, status: res.statusCode, data });
                } else {
                    errorCount++;
                    logStatus(` Render responded with status: ${res.statusCode} | Errors: ${errorCount}/${pingCount}`, 'warning');
                    resolve({ success: false, status: res.statusCode, data });
                }
            });
        });
        
        req.on('timeout', () => {
            req.destroy();
            errorCount++;
            logStatus(` Request timeout | Errors: ${errorCount}/${pingCount}`, 'error');
            reject(new Error('Request timeout'));
        });
        
        req.on('error', (err) => {
            errorCount++;
            logStatus(` Request failed: ${err.message} | Errors: ${errorCount}/${pingCount}`, 'error');
            reject(err);
        });
        
        req.setTimeout(10000);
    });
}

async function keepAliveRoutine() {
    pingCount++;
    logStatus(` Keep-alive ping #${pingCount} starting...`, 'info');
    
    try {
        const result = await pingRender();
        
        if (result.success) {
            try {
                const healthData = JSON.parse(result.data);
                logStatus(` Health check: ${healthData.service} | ${healthData.status}`, 'success');
            } catch (e) {
                logStatus(` Health response received (non-JSON)`, 'success');
            }
        }
        
        // Calculate next ping time
        const nextPing = new Date(Date.now() + PING_INTERVAL);
        logStatus(` Next ping scheduled for: ${nextPing.toLocaleTimeString()}`, 'info');
        
    } catch (error) {
        logStatus(` Keep-alive failed: ${error.message}`, 'error');
        logStatus(` Will retry in 14 minutes...`, 'warning');
    }
    
    // Show statistics every 10 pings
    if (pingCount % 10 === 0) {
        const uptime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
        const successRate = ((successCount / pingCount) * 100).toFixed(1);
        logStatus(` Statistics: ${successRate}% success rate | ${uptime} min uptime | ${pingCount} total pings`, 'info');
    }
}

// Start the keep-alive service
const startTime = Date.now();

logStatus(' RENDER KEEP-ALIVE SERVICE STARTING', 'success');
logStatus(` Target: ${RENDER_URL}`, 'info');
logStatus(` Interval: ${PING_INTERVAL / 1000 / 60} minutes`, 'info');
logStatus(` Purpose: Prevent Render free tier sleep`, 'info');
logStatus('', 'info');

// Initial ping
keepAliveRoutine();

// Set up recurring pings
setInterval(keepAliveRoutine, PING_INTERVAL);

// Graceful shutdown handling
process.on('SIGINT', () => {
    const uptime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    const successRate = ((successCount / pingCount) * 100).toFixed(1);
    
    logStatus(' KEEP-ALIVE SERVICE SHUTTING DOWN', 'warning');
    logStatus(` Final Stats: ${successRate}% success | ${uptime} min uptime | ${pingCount} pings`, 'info');
    process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    logStatus(` Uncaught exception: ${error.message}`, 'error');
    logStatus(' Service continuing...', 'warning');
});

process.on('unhandledRejection', (reason, promise) => {
    logStatus(` Unhandled rejection: ${reason}`, 'error');
    logStatus(' Service continuing...', 'warning');
});
