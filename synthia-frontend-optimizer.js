/**
 * SYNTHIA FRONTEND OPTIMIZATION ENGINE
 * Optimizes HTML, CSS, and JavaScript for better performance
 * Mobile-first optimization for ESQs Platform
 */

const fs = require("fs").promises;
const path = require("path");

class SynthiaFrontendOptimizer {
    constructor() {
        this.optimizations = [];
        this.startTime = Date.now();
    }

    async optimizeAll() {
        console.log(" SYNTHIA FRONTEND OPTIMIZATION ENGINE v1.0");
        console.log(" Optimizing mobile app performance...");
        console.log("");

        try {
            await this.scanAndOptimizeHTML();
            await this.optimizeCSS();
            await this.optimizeJavaScript();
            await this.generatePerformanceReport();
            
            const runtime = Date.now() - this.startTime;
            console.log(` Frontend optimization complete! (${Math.round(runtime/1000)}s)`);
            console.log(` Applied ${this.optimizations.length} optimizations`);
            
        } catch (error) {
            console.log(" Frontend optimization error:", error.message);
        }
    }

    async scanAndOptimizeHTML() {
        console.log(" SCANNING HTML FILES:");
        
        const htmlFiles = await this.findFiles(".", ".html");
        console.log(` Found ${htmlFiles.length} HTML files`);

        for (const htmlFile of htmlFiles) {
            try {
                const content = await fs.readFile(htmlFile, "utf8");
                let optimizedContent = content;
                let changes = 0;

                // Add mobile viewport if missing
                if (!content.includes("viewport")) {
                    optimizedContent = optimizedContent.replace(
                        "<head>",
                        "<head>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                    );
                    changes++;
                    console.log(`    Added mobile viewport to ${path.basename(htmlFile)}`);
                }

                // Add performance meta tags
                if (!content.includes("preconnect")) {
                    optimizedContent = optimizedContent.replace(
                        "<head>",
                        "<head>\n    <link rel=\"preconnect\" href=\"https://esqs-backend.onrender.com\">"
                    );
                    changes++;
                    console.log(`    Added DNS preconnect to ${path.basename(htmlFile)}`);
                }

                // Optimize API calls to use production URL
                if (content.includes("localhost:3000")) {
                    optimizedContent = optimizedContent.replace(
                        /localhost:3000/g,
                        "esqs-backend.onrender.com"
                    );
                    changes++;
                    console.log(`    Updated API URLs to production in ${path.basename(htmlFile)}`);
                }

                // Add loading="lazy" to images
                if (content.includes("<img") && !content.includes("loading=")) {
                    optimizedContent = optimizedContent.replace(
                        /<img([^>]+)>/g,
                        "<img$1 loading=\"lazy\">"
                    );
                    changes++;
                    console.log(`     Added lazy loading to images in ${path.basename(htmlFile)}`);
                }

                // Save optimized version if changes were made
                if (changes > 0) {
                    const backupFile = htmlFile + ".backup";
                    await fs.copyFile(htmlFile, backupFile);
                    await fs.writeFile(htmlFile, optimizedContent);
                    
                    this.optimizations.push({
                        file: htmlFile,
                        type: "HTML",
                        changes: changes
                    });
                    
                    console.log(`    Optimized ${path.basename(htmlFile)} (${changes} improvements)`);
                }

            } catch (error) {
                console.log(`     Could not optimize ${htmlFile}: ${error.message}`);
            }
        }
    }

    async optimizeCSS() {
        console.log("");
        console.log(" OPTIMIZING CSS:");

        const cssFiles = await this.findFiles(".", ".css");
        console.log(` Found ${cssFiles.length} CSS files`);

        for (const cssFile of cssFiles) {
            try {
                const content = await fs.readFile(cssFile, "utf8");
                let optimizedContent = content;
                let changes = 0;

                // Add mobile-first media queries if missing
                if (!content.includes("@media") && content.length > 100) {
                    optimizedContent += `

/* Synthia Mobile Optimization */
@media (max-width: 768px) {
    body { font-size: 16px; padding: 10px; }
    .container { max-width: 100%; padding: 0 15px; }
    button, input { min-height: 44px; } /* Touch-friendly sizing */
}`;
                    changes++;
                    console.log(`    Added mobile-first CSS to ${path.basename(cssFile)}`);
                }

                // Remove unused whitespace (basic minification)
                const minified = optimizedContent
                    .replace(/\s+/g, " ")
                    .replace(/;\s/g, ";")
                    .replace(/,\s/g, ",")
                    .replace(/{\s/g, "{")
                    .replace(/\s}/g, "}");

                if (minified.length < optimizedContent.length) {
                    optimizedContent = minified;
                    changes++;
                    console.log(`     Minified ${path.basename(cssFile)} (${optimizedContent.length - content.length} bytes saved)`);
                }

                if (changes > 0) {
                    const backupFile = cssFile + ".backup";
                    await fs.copyFile(cssFile, backupFile);
                    await fs.writeFile(cssFile, optimizedContent);
                    
                    this.optimizations.push({
                        file: cssFile,
                        type: "CSS",
                        changes: changes
                    });
                }

            } catch (error) {
                console.log(`     Could not optimize ${cssFile}: ${error.message}`);
            }
        }
    }

    async optimizeJavaScript() {
        console.log("");
        console.log(" OPTIMIZING JAVASCRIPT:");

        const jsFiles = await this.findFiles(".", ".js");
        const frontendJS = jsFiles.filter(f => 
            !f.includes("node_modules") && 
            !f.includes("backend-server") &&
            !f.includes("optimization")
        );

        console.log(` Found ${frontendJS.length} frontend JS files`);

        for (const jsFile of frontendJS) {
            try {
                const content = await fs.readFile(jsFile, "utf8");
                let suggestions = [];

                // Check for performance optimizations
                if (content.includes("fetch(") && !content.includes("AbortController")) {
                    suggestions.push("Add request timeouts with AbortController");
                }

                if (content.includes("addEventListener") && !content.includes("once:")) {
                    suggestions.push("Consider using {once: true} for one-time events");
                }

                if (content.includes("setInterval") && !content.includes("clearInterval")) {
                    suggestions.push("Ensure intervals are cleared to prevent memory leaks");
                }

                if (content.includes("console.log")) {
                    suggestions.push("Remove console.log statements for production");
                }

                if (suggestions.length > 0) {
                    console.log(`    ${path.basename(jsFile)} suggestions:`);
                    suggestions.forEach(s => console.log(`       ${s}`));
                    
                    this.optimizations.push({
                        file: jsFile,
                        type: "JavaScript",
                        suggestions: suggestions
                    });
                }

            } catch (error) {
                console.log(`     Could not analyze ${jsFile}: ${error.message}`);
            }
        }
    }

    async generatePerformanceReport() {
        console.log("");
        console.log(" PERFORMANCE RECOMMENDATIONS:");
        
        console.log(" Mobile Performance:");
        console.log("    All images should have lazy loading");
        console.log("    Use WebP format for better compression");
        console.log("    Enable service worker for offline functionality");
        
        console.log(" API Performance:");
        console.log("    Cache API responses in localStorage");
        console.log("    Use request debouncing for search inputs");
        console.log("    Implement retry logic for failed requests");
        
        console.log(" Mobile UX:");
        console.log("    Touch targets should be at least 44px");
        console.log("    Use mobile-friendly form inputs");
        console.log("    Implement pull-to-refresh where appropriate");

        const report = {
            timestamp: new Date().toISOString(),
            optimizations: this.optimizations,
            recommendations: [
                "Enable PWA features for mobile app-like experience",
                "Implement dark mode for better battery life",
                "Add offline document generation capability",
                "Use CSS Grid for responsive layouts"
            ]
        };

        await fs.writeFile("frontend-optimization-report.json", JSON.stringify(report, null, 2));
        console.log(" Report saved to frontend-optimization-report.json");
    }

    async findFiles(dir, extension) {
        const files = [];
        try {
            const items = await fs.readdir(dir, { withFileTypes: true });
            
            for (const item of items) {
                const fullPath = path.join(dir, item.name);
                
                if (item.isDirectory() && !item.name.startsWith(".") && item.name !== "node_modules") {
                    files.push(...await this.findFiles(fullPath, extension));
                } else if (item.isFile() && item.name.endsWith(extension)) {
                    files.push(fullPath);
                }
            }
        } catch (error) {
            // Skip directories we cant read
        }
        
        return files;
    }
}

// Auto-run if called directly
if (require.main === module) {
    const optimizer = new SynthiaFrontendOptimizer();
    optimizer.optimizeAll();
}

module.exports = SynthiaFrontendOptimizer;
