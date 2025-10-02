// SYNTHIA DRIVE & REPOSITORY GUARDIAN
// Protects drives and repositories with real-time monitoring

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const CRITICAL_PATHS = [
    'F:\\ESQs-Platform-MOBILE-ONLINE',
    'F:\\ESQs-Platform-MOBILE-ONLINE\\.git',
    'F:\\ESQs-Platform-MOBILE-ONLINE\\package.json',
    'F:\\ESQs-Platform-MOBILE-ONLINE\\render-server.js'
];

const BACKUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
let backupCount = 0;

function guardianLog(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
        info: '\x1b[36m',
        success: '\x1b[32m',
        error: '\x1b[31m',
        critical: '\x1b[41m\x1b[37m'
    };
    console.log(`${colors[type]}[GUARDIAN-${timestamp}] ${message}\x1b[0m`);
}

async function checkCriticalPaths() {
    for (const criticalPath of CRITICAL_PATHS) {
        try {
            const stats = fs.statSync(criticalPath);
            guardianLog(` Protected: ${path.basename(criticalPath)}`, 'success');
        } catch (error) {
            guardianLog(` CRITICAL PATH MISSING: ${criticalPath}`, 'critical');
            await recoverPath(criticalPath);
        }
    }
}

async function recoverPath(missingPath) {
    guardianLog(` Attempting recovery of: ${missingPath}`, 'info');
    
    if (missingPath.includes('.git')) {
        // Reinitialize git if needed
        exec('git init', { cwd: 'F:\\ESQs-Platform-MOBILE-ONLINE' });
        exec('git remote add origin https://github.com/BCLS-ESQs/ESQs-Platform-MOBILE-ONLINE.git', 
             { cwd: 'F:\\ESQs-Platform-MOBILE-ONLINE' });
    }
}

async function createSystemBackup() {
    backupCount++;
    guardianLog(` Creating system backup #${backupCount}`, 'info');
    
    // Git backup
    exec('git add . && git commit -m " Guardian auto-backup" && git push origin main', 
         { cwd: 'F:\\ESQs-Platform-MOBILE-ONLINE' });
    
    guardianLog(` Backup #${backupCount} completed`, 'success');
}

// Initialize guardian
guardianLog(' SYNTHIA DRIVE & REPOSITORY GUARDIAN STARTING', 'critical');
guardianLog(' Protecting critical paths and repository integrity', 'info');

// Start protection
checkCriticalPaths();
setInterval(checkCriticalPaths, 60000); // Check every minute
setInterval(createSystemBackup, BACKUP_INTERVAL); // Backup every 5 minutes
