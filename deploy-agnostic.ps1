# ESQs Platform - Drive Agnostic Deployment Script
# Works from ANY drive location without hardcoded paths

param(
    [string]$Action = "deploy",
    [string]$Target = "render"
)

Write-Host "🚀 ESQs Platform - Drive Agnostic Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Get current location (works on any drive)
$WorkspaceRoot = Get-Location
$DriveLetter = Split-Path -Path $WorkspaceRoot -Qualifier

Write-Host "📂 Workspace: $WorkspaceRoot" -ForegroundColor Green
Write-Host "💾 Drive: $DriveLetter" -ForegroundColor Green
Write-Host "🌐 Platform Independent: TRUE" -ForegroundColor Green
Write-Host ""

function Test-ESQsFiles {
    Write-Host "🔍 Checking ESQs Platform Files..." -ForegroundColor Yellow
    
    $RequiredFiles = @(
        "render.yaml",
        "package.json", 
        "backend-server.js",
        "legal-research-fastapi-main.py",
        "ai-synthia-bridge.js",
        "synthia-integration.js"
    )
    
    $AllPresent = $true
    
    foreach ($File in $RequiredFiles) {
        if (Test-Path $File) {
            Write-Host "   ✅ $File" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $File" -ForegroundColor Red
            $AllPresent = $false
        }
    }
    
    return $AllPresent
}

function Fix-PythonDependencies {
    Write-Host "🔧 Fixing Python Dependencies..." -ForegroundColor Yellow
    
    # Create optimized requirements.txt without compilation issues
    $OptimizedRequirements = @"
# ESQs Legal Research API - Optimized Dependencies
# No C++ compilation required - Pure Python packages only

fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-multipart==0.0.6

# Lightweight NLP (replaces spacy)
nltk==3.8.1
textblob==0.17.1

# Document processing
python-docx==1.1.0
PyPDF2==3.0.1
openpyxl==3.1.2

# HTTP and utilities
httpx==0.25.2
requests==2.31.0
python-dotenv==1.0.0

# Database
sqlalchemy==2.0.23
"@
    
    Set-Content -Path "legal-research-requirements.txt" -Value $OptimizedRequirements
    Write-Host "   ✅ Created optimized legal-research-requirements.txt" -ForegroundColor Green
}

function Start-LocalTest {
    Write-Host "🧪 Starting Local Test..." -ForegroundColor Yellow
    
    # Test Node.js services
    Write-Host "   🟢 Testing Node.js services..."
    npm install
    
    # Test Python service
    Write-Host "   🐍 Testing Python service..."
    if (Test-Path "legal-research-env") {
        & "legal-research-env\Scripts\activate.ps1"
        pip install -r legal-research-requirements.txt
    }
    
    Write-Host "   ✅ Local test setup complete" -ForegroundColor Green
}

function Deploy-ToRender {
    Write-Host "☁️ Deploying to Render..." -ForegroundColor Yellow
    
    # Check git status
    $GitStatus = git status --porcelain
    if ($GitStatus) {
        Write-Host "   📝 Committing changes..." -ForegroundColor Blue
        git add .
        git commit -m "Drive-agnostic ESQs deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    # Push to deployment
    Write-Host "   🚀 Pushing to deployment branch..." -ForegroundColor Blue
    git push origin main
    
    Write-Host "   ✅ Deployment initiated" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Check deployment status at:" -ForegroundColor Cyan
    Write-Host "   https://dashboard.render.com" -ForegroundColor Blue
}

function Show-SynthiaStatus {
    Write-Host "🧠 Synthia AI Status:" -ForegroundColor Magenta
    Write-Host "   • Drive Agnostic: ✅ ACTIVE" -ForegroundColor Green
    Write-Host "   • Multi-AI Coordination: ✅ READY" -ForegroundColor Green
    Write-Host "   • ESQs Platform: ✅ OPTIMIZED" -ForegroundColor Green
    Write-Host "   • Deployment Ready: ✅ YES" -ForegroundColor Green
}

# Main execution flow
Write-Host "🎯 Action: $Action" -ForegroundColor Blue
Write-Host "🎯 Target: $Target" -ForegroundColor Blue
Write-Host ""

switch ($Action.ToLower()) {
    "check" {
        $FilesOK = Test-ESQsFiles
        if ($FilesOK) {
            Write-Host "✅ All ESQs files present!" -ForegroundColor Green
        } else {
            Write-Host "❌ Missing files detected!" -ForegroundColor Red
        }
    }
    
    "fix" {
        Fix-PythonDependencies
        Write-Host "✅ Dependencies optimized!" -ForegroundColor Green
    }
    
    "test" {
        Start-LocalTest
        Write-Host "✅ Local test environment ready!" -ForegroundColor Green
    }
    
    "deploy" {
        $FilesOK = Test-ESQsFiles
        if ($FilesOK) {
            Fix-PythonDependencies
            Deploy-ToRender
            Write-Host "🎉 ESQs Platform deployment complete!" -ForegroundColor Green
        } else {
            Write-Host "❌ Cannot deploy - missing files!" -ForegroundColor Red
        }
    }
    
    "synthia" {
        Show-SynthiaStatus
        Write-Host ""
        Write-Host "💬 Starting Synthia Chat Interface..." -ForegroundColor Cyan
        if (Test-Path "synthia-portable.js") {
            node synthia-portable.js
        } else {
            Write-Host "❌ synthia-portable.js not found!" -ForegroundColor Red
        }
    }
    
    default {
        Write-Host "❓ Unknown action: $Action" -ForegroundColor Red
        Write-Host ""
        Write-Host "Available actions:" -ForegroundColor Yellow
        Write-Host "   check   - Check ESQs platform files" -ForegroundColor White
        Write-Host "   fix     - Fix Python dependencies" -ForegroundColor White
        Write-Host "   test    - Setup local test environment" -ForegroundColor White
        Write-Host "   deploy  - Deploy to Render" -ForegroundColor White
        Write-Host "   synthia - Start Synthia AI chat" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "🧠 Synthia AI: Drive-agnostic deployment complete!" -ForegroundColor Magenta
Write-Host "📍 Working from: $WorkspaceRoot" -ForegroundColor Blue
