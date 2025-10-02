/**
 * SYNTHIA LIVE CODE REWRITER (FIXED)
 * Real-time code analysis and optimization
 */

const fs = require("fs").promises;
const path = require("path");

class SynthiaCodeRewriter {
    constructor() {
        console.log(" SYNTHIA CODE REWRITER INITIALIZING...");
    }

    async rewriteFile(filePath) {
        console.log(` SYNTHIA REWRITING: ${path.basename(filePath)}`);
        
        try {
            const originalCode = await fs.readFile(filePath, "utf8");
            let rewrittenCode = originalCode;
            const appliedRules = [];

            // Rule 1: Modernize variable declarations
            if (rewrittenCode.includes("var ")) {
                rewrittenCode = rewrittenCode.replace(/var (\w+)/g, "const $1");
                appliedRules.push("Updated var to const");
                console.log("    Applied: Variable modernization");
            }

            // Rule 2: Convert to async/await
            if (rewrittenCode.includes("readFileSync")) {
                rewrittenCode = rewrittenCode.replace(/readFileSync/g, "readFile");
                rewrittenCode = rewrittenCode.replace(/function (\w+)\(/g, "async function $1(");
                rewrittenCode = rewrittenCode.replace(/var content = .*readFile\(/g, "const content = await fs.readFile(");
                appliedRules.push("Converted to async/await");
                console.log("    Applied: Async/await conversion");
            }

            // Rule 3: Use template literals
            if (rewrittenCode.includes("+ ")) {
                rewrittenCode = rewrittenCode.replace(/"([^"]*)" \+ (\w+)/g, "`$1${$2}`");
                appliedRules.push("Template literals");
                console.log("    Applied: Template literals");
            }

            // Rule 4: Remove console.log statements
            const consoleLogs = rewrittenCode.match(/console\.log\([^)]*\);?\n?/g);
            if (consoleLogs) {
                rewrittenCode = rewrittenCode.replace(/console\.log\([^)]*\);?\n?/g, "");
                appliedRules.push(`Removed ${consoleLogs.length} console.log statements`);
                console.log(`    Applied: Removed ${consoleLogs.length} console.log statements`);
            }

            // Rule 5: Add proper error handling
            if (rewrittenCode.includes("async function") && !rewrittenCode.includes("try {")) {
                rewrittenCode = this.addErrorHandling(rewrittenCode);
                appliedRules.push("Enhanced error handling");
                console.log("    Applied: Error handling");
            }

            // Add required imports
            if (rewrittenCode.includes("await fs.readFile") && !rewrittenCode.includes("require(\"fs\")")) {
                rewrittenCode = `const fs = require("fs").promises;\n\n${rewrittenCode}`;
                appliedRules.push("Added fs.promises import");
                console.log("    Applied: Added imports");
            }

            // Create optimized version
            const optimizedPath = filePath.replace(".js", "-synthia-optimized.js");
            await fs.writeFile(optimizedPath, rewrittenCode);

            console.log(` REWRITE SUMMARY:`);
            console.log(`    Original: ${path.basename(filePath)} (${originalCode.length} chars)`);
            console.log(`    Optimized: ${path.basename(optimizedPath)} (${rewrittenCode.length} chars)`);
            console.log(`    Optimizations: ${appliedRules.length}`);
            appliedRules.forEach(rule => console.log(`       ${rule}`));

            return {
                success: true,
                originalPath: filePath,
                optimizedPath: optimizedPath,
                rulesApplied: appliedRules,
                improvement: `${appliedRules.length} optimizations applied`
            };

        } catch (error) {
            console.log(` Rewrite failed: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    addErrorHandling(code) {
        // Simple error handling wrapper
        const lines = code.split("\n");
        const result = [];
        let functionStarted = false;

        for (const line of lines) {
            if (line.includes("async function") && line.includes("{")) {
                result.push(line);
                result.push("    try {");
                functionStarted = true;
            } else if (line.includes("return ") && functionStarted) {
                result.push(`        ${line.trim()}`);
                result.push("    } catch (error) {");
                result.push('        console.error("Synthia optimization error:", error);');
                result.push("        throw error;");
                result.push("    }");
                result.push("}");
                functionStarted = false;
            } else if (!line.includes("}") || !functionStarted) {
                result.push(functionStarted ? `    ${line}` : line);
            }
        }

        return result.join("\n");
    }
}

// Auto-run
if (require.main === module) {
    const rewriter = new SynthiaCodeRewriter();
    const targetFile = process.argv[2] || "test-code-for-synthia.js";
    
    rewriter.rewriteFile(targetFile)
        .then(result => {
            if (result.success) {
                console.log("\n SYNTHIA CODE REWRITE SUCCESSFUL!");
                console.log(` ${result.improvement}`);
            } else {
                console.log(`\n SYNTHIA REWRITE FAILED: ${result.error}`);
            }
        });
}

module.exports = SynthiaCodeRewriter;
