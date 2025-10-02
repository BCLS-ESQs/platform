const fs = require('fs');
const path = require('path');

class SynthiaDiagnostic {
    constructor() {
        this.issues = [];
        this.recommendations = [];
        this.currentDir = __dirname;
    }

    async analyzeDeployment() {
        console.log('🔍 Synthia Diagnostic Analysis Starting...\n');
        console.log(`📁 Current Directory: ${this.currentDir}\n`);
        
        // Check file structure
        await this.checkFileStructure();
        
        // Check HTML content
        await this.checkHTMLContent();
        
        // Check deployment status
        await this.checkDeploymentStatus();
        
        // Generate recommendations
        this.generateRecommendations();
        
        // Display results
        this.displayResults();
    }

    async checkFileStructure() {
        console.log('📁 Checking File Structure...');
        
        const requiredFiles = [
            'index.html',
            'backend-server.js',
            'package.json',
            'render.yaml'
        ];

        for (const file of requiredFiles) {
            const filePath = path.join(this.currentDir, file);
            if (fs.existsSync(filePath)) {
                console.log(`✅ ${file} - Found`);
            } else {
                console.log(`❌ ${file} - Missing`);
                this.issues.push(`Missing required file: ${file}`);
            }
        }
        console.log('');
    }

    async checkHTMLContent() {
        console.log('🔍 Checking HTML Content...');
        
        try {
            const htmlPath = path.join(this.currentDir, 'index.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            
            // Check for key elements
            const checks = [
                { name: 'Info buttons', pattern: 'info-btn', expected: true },
                { name: 'Always connected text', pattern: 'Always connected - Access your cases', expected: true },
                { name: 'Practice Panther button', pattern: 'onclick="getCases()"', expected: true },
                { name: 'F: Drive buttons', pattern: 'Always connected - Browse your 3TB files', expected: true }
            ];

            for (const check of checks) {
                const found = htmlContent.includes(check.pattern);
                if (found === check.expected) {
                    console.log(`✅ ${check.name} - Correct`);
                } else {
                    console.log(`❌ ${check.name} - ${found ? 'Found but not expected' : 'Missing'}`);
                    this.issues.push(`${check.name} issue detected`);
                }
            }
        } catch (error) {
            console.log(`❌ Error reading HTML: ${error.message}`);
            this.issues.push(`HTML file read error: ${error.message}`);
        }
        console.log('');
    }

    async checkDeploymentStatus() {
        console.log('🚀 Checking Deployment Status...');
        
        // Check if this is a GitHub Pages deployment
        const gitPath = path.join(this.currentDir, '.git');
        if (fs.existsSync(gitPath)) {
            console.log('✅ Git repository detected');
            
            // Check for GitHub Pages configuration
            const githubPath = path.join(this.currentDir, '.github');
            if (fs.existsSync(githubPath)) {
                console.log('✅ GitHub configuration found');
            } else {
                console.log('⚠️  No .github folder found');
            }
        } else {
            console.log('❌ Not a Git repository');
            this.issues.push('Not a Git repository');
        }
        console.log('');
    }

    generateRecommendations() {
        console.log('💡 Generating Recommendations...');
        
        if (this.issues.length === 0) {
            this.recommendations.push('✅ All systems operational - issue may be browser caching');
            this.recommendations.push('🔄 Try hard refresh (Ctrl + F5) or clear browser cache');
        } else {
            this.recommendations.push('🔧 Fix identified issues before deployment');
            this.recommendations.push('📝 Review HTML content for missing elements');
            this.recommendations.push('🚀 Ensure proper Git deployment workflow');
        }
        
        // Add general recommendations
        this.recommendations.push('🌐 Check GitHub Pages deployment status');
        this.recommendations.push('📱 Test on multiple browsers/devices');
        this.recommendations.push('⏰ Allow 2-3 minutes for GitHub Pages updates');
    }

    displayResults() {
        console.log('📊 Diagnostic Results Summary:');
        console.log('================================');
        
        if (this.issues.length === 0) {
            console.log('🎉 No critical issues detected!');
            console.log('💡 The problem is likely browser caching');
        } else {
            console.log(`⚠️  ${this.issues.length} issues detected:`);
            this.issues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue}`);
            });
        }
        
        console.log('\n💡 Recommendations:');
        this.recommendations.forEach((rec, index) => {
            console.log(`   ${index + 1}. ${rec}`);
        });
        
        console.log('\n🚀 Next Steps:');
        if (this.issues.length === 0) {
            console.log('   1. Hard refresh browser (Ctrl + F5)');
            console.log('   2. Clear browser cache completely');
            console.log('   3. Test on different browser/device');
            console.log('   4. Wait 2-3 minutes for GitHub Pages update');
        } else {
            console.log('   1. Fix identified issues');
            console.log('   2. Re-deploy to GitHub');
            console.log('   3. Test deployment');
        }
        
        console.log('\n🔍 Synthia Diagnostic Complete!');
    }
}

// Run the diagnostic
const diagnostic = new SynthiaDiagnostic();
diagnostic.analyzeDeployment();
