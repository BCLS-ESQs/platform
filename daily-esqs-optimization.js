const fs = require("fs").promises;
const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

console.log(" SYNTHIA DAILY OPTIMIZATION ENGINE v1.0");
console.log(" Making ESQs better every single day...");
console.log("");

(async () => {
    const startTime = Date.now();
    
    try {
        console.log(" SYSTEM HEALTH CHECK:");
        
        // Check local ESQs Platform
        try {
            const { stdout } = await execAsync("netstat -ano | findstr 3000");
            if (stdout.includes("LISTENING")) {
                console.log(" ESQs Platform: RUNNING");
            } else {
                console.log(" ESQs Platform: OFFLINE");
            }
        } catch {
            console.log("  ESQs Platform: Status unknown");
        }
        
        console.log("");
        console.log(" DOCUMENT GENERATION TEST:");
        
        // Test document generation performance
        const testStart = Date.now();
        try {
            const testPayload = JSON.stringify({
                PLAINTIFF: "Synthia Test",
                DEFENDANT: "Performance Check", 
                CASE_NUMBER: "OPT-" + Date.now()
            });
            
            const response = await fetch("http://localhost:3000/api/docs/motion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: testPayload
            });
            
            const testTime = Date.now() - testStart;
            
            if (response.ok) {
                console.log(` Document generation: SUCCESS (${testTime}ms)`);
                if (testTime > 3000) {
                    console.log(" OPTIMIZATION: Consider template caching for speed");
                }
            } else {
                console.log(" Document generation: FAILED");
            }
        } catch (error) {
            console.log(" Document generation: OFFLINE");
        }
        
        console.log("");
        console.log("  CLOUD DEPLOYMENT CHECK:");
        
        // Check cloud deployment
        const cloudUrls = [
            "https://esqs-backend.onrender.com/health",
            "https://esqs-platform-mobile-online.onrender.com/health"
        ];
        
        let cloudOnline = false;
        for (const url of cloudUrls) {
            try {
                const response = await fetch(url, { 
                    signal: AbortSignal.timeout(8000) 
                });
                if (response.ok) {
                    console.log(` Cloud deployment: ONLINE (${url})`);
                    cloudOnline = true;
                    break;
                }
            } catch {
                // Try next URL
            }
        }
        
        if (!cloudOnline) {
            console.log(" Cloud deployment: OFFLINE");
            console.log(" ACTION NEEDED: Check Render dashboard and manual deploy");
        }
        
        console.log("");
        console.log(" FILE SYSTEM ANALYSIS:");
        
        // Check templates
        try {
            const templates = await fs.readdir("templates");
            console.log(` Templates found: ${templates.length}`);
            
            for (const template of templates) {
                const stats = await fs.stat(`templates/${template}`);
                const sizeKB = Math.round(stats.size / 1024);
                console.log(`    ${template}: ${sizeKB}KB`);
                
                if (sizeKB > 100) {
                    console.log("    OPTIMIZATION: Large template - consider compression");
                }
            }
        } catch {
            console.log("  Templates directory: Check access");
        }
        
        console.log("");
        console.log(" DEPENDENCY CHECK:");
        
        // Check for outdated packages
        try {
            const { stdout } = await execAsync("npm outdated --json").catch(() => ({ stdout: "{}" }));
            const outdated = JSON.parse(stdout || "{}");
            const outdatedCount = Object.keys(outdated).length;
            
            if (outdatedCount > 0) {
                console.log(`  Outdated packages: ${outdatedCount}`);
                console.log(" RECOMMENDATION: Run npm update");
            } else {
                console.log(" Dependencies: Up to date");
            }
        } catch {
            console.log("  Package check: Unable to verify");
        }
        
        console.log("");
        console.log(" PERFORMANCE OPTIMIZATION:");
        
        // Check for optimization opportunities
        try {
            const jsFiles = await fs.readdir(".");
            const jsCount = jsFiles.filter(f => f.endsWith(".js")).length;
            console.log(` JavaScript files: ${jsCount}`);
            
            // Check backend-server.js for optimizations
            try {
                const serverCode = await fs.readFile("backend-server.js", "utf8");
                
                if (serverCode.includes("console.log")) {
                    console.log(" OPTIMIZATION: Remove console.log statements for production");
                }
                
                if (!serverCode.includes("compression")) {
                    console.log(" OPTIMIZATION: Add compression middleware for faster responses");
                }
                
                if (!serverCode.includes("helmet")) {
                    console.log(" SECURITY: Add helmet middleware for security headers");
                }
                
            } catch {
                console.log("  Backend analysis: File access limited");
            }
            
        } catch {
            console.log("  File analysis: Limited access");
        }
        
        console.log("");
        console.log(" DAILY RECOMMENDATIONS:");
        console.log(" Priority 1: Ensure cloud deployment is online");
        console.log(" Priority 2: Monitor document generation speed");
        console.log(" Priority 3: Keep dependencies updated");
        console.log(" Priority 4: Optimize API response times");
        
        const runtime = Date.now() - startTime;
        console.log("");
        console.log(` OPTIMIZATION COMPLETE! (${Math.round(runtime/1000)}s)`);
        console.log(" Synthia will make ESQs better tomorrow too!");
        
        // Save optimization log
        const report = {
            date: new Date().toISOString().split("T")[0],
            timestamp: new Date().toISOString(),
            runtime: runtime,
            status: "completed"
        };
        
        await fs.writeFile("optimization-log.json", JSON.stringify(report, null, 2));
        console.log(" Report saved to optimization-log.json");
        
    } catch (error) {
        console.log(" OPTIMIZATION ERROR:", error.message);
    }
})();
