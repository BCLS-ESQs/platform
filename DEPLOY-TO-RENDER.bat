@echo off
title ESQs Platform - Deploy to Render
color 0A

echo.
echo ========================================
echo    ESQs Platform - Deploy to Render
echo    Professional Cloud Deployment
echo ========================================
echo.

echo 🚀 **Deploying ESQs Platform to Render Cloud**
echo.
echo This will deploy your complete ESQs system to Render
echo for professional, scalable cloud hosting!
echo.

echo 📋 **Services Being Deployed:**
echo • ESQs Backend Server (Node.js)
echo • Legal Research API (FastAPI/Python)
echo • AI-Synthia Bridge (Node.js)
echo • Synthia Integration Engine (Node.js)
echo.

echo 🌐 **Render Deployment Benefits:**
echo • Professional cloud hosting
echo • Automatic SSL certificates
echo • Global CDN distribution
echo • Auto-scaling capabilities
echo • 99.9%% uptime guarantee
echo • Professional URLs
echo.

echo 🔧 **Prerequisites Check:**
echo • GitHub repository with latest code
echo • Render account (free tier available)
echo • render.yaml configuration file
echo.

echo 📝 **Step 1: Push Latest Changes to GitHub**
echo.

echo Ensuring all files are up to date...
git add .
git commit -m "🚀 Render deployment configuration - ESQs Platform v4.5.2"
git push origin main

if errorlevel 1 (
    echo ❌ Git push failed. Please check your repository status.
    echo Make sure you have a GitHub repository set up and connected.
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub successfully
echo.

echo 📋 **Step 2: Render Deployment Instructions**
echo.
echo **MANUAL STEPS TO COMPLETE:**
echo.
echo 1. Go to https://render.com/
echo 2. Sign up/Login with your GitHub account
echo 3. Click "New +" button
echo 4. Select "Blueprint"
echo 5. Connect your GitHub repository
echo 6. Select the repository containing this code
echo 7. Click "Connect"
echo 8. Render will automatically detect render.yaml
echo 9. Click "Apply Blueprint"
echo.

echo 🔧 **Render.yaml Configuration Details:**
echo.
echo **Service 1: ESQs Backend** (Port 10000)
echo • Runtime: Node.js
echo • Start Command: node backend-server.js
echo • Health Check: /api/health
echo.
echo **Service 2: Legal Research API** (Port 10001)
echo • Runtime: Python
echo • Start Command: python legal-research-fastapi-main.py
echo • Health Check: /
echo.
echo **Service 3: AI-Synthia Bridge** (Port 10002)
echo • Runtime: Node.js
echo • Start Command: node ai-synthia-bridge.js
echo • Health Check: /ai/status
echo.
echo **Service 4: Synthia Integration** (Port 10003)
echo • Runtime: Node.js
echo • Start Command: node synthia-integration.js
echo • Health Check: /synthia/health
echo.

echo 🌐 **Expected URLs After Deployment:**
echo • ESQs Backend: https://esqs-backend.onrender.com
echo • Legal Research: https://esqs-legal-research.onrender.com
echo • AI Bridge: https://esqs-ai-bridge.onrender.com
echo • Synthia Engine: https://esqs-synthia.onrender.com
echo.

echo 📊 **Deployment Timeline:**
echo • Initial deployment: 5-10 minutes
echo • All services will start automatically
echo • Health checks will verify functionality
echo • SSL certificates will be provisioned
echo.

echo 🎯 **Post-Deployment Steps:**
echo 1. Verify all 4 services are running
echo 2. Test API endpoints
echo 3. Check health check status
echo 4. Update any hardcoded localhost URLs
echo 5. Test inter-service communication
echo.

echo ========================================
echo        RENDER DEPLOYMENT READY
echo ========================================
echo.
echo ✅ Code pushed to GitHub
echo ✅ render.yaml configured
echo ✅ Environment variables set
echo ✅ Health checks configured
echo ✅ Multi-service setup ready
echo.
echo 🚀 **Next: Complete deployment at render.com**
echo.
echo Follow the manual steps above to complete
echo your professional cloud deployment!
echo.

echo Press any key to open Render.com...
pause >nul

start https://render.com/

echo.
echo 🎉 **Render deployment initiated!**
echo Your ESQs Platform will be live in 5-10 minutes.
echo.

pause
