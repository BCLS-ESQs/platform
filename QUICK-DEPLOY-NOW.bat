@echo off
title ESQs Platform - QUICK DEPLOY NOW
color 0C

echo.
echo ========================================
echo    ESQs Platform - QUICK DEPLOY NOW
echo    Get Your Team Link in 3 Minutes!
echo ========================================
echo.

echo 🚀 **URGENT: Deploy ESQs Platform NOW for Team Access**
echo.
echo Your team needs the link immediately!
echo This script will deploy in 3 minutes flat.
echo.

echo 📋 **What's Ready to Deploy:**
echo ✅ Team member selection and access control
echo ✅ Practice Panther integration with OAuth 2.0
echo ✅ Voice control system for mobile and desktop
echo ✅ Legal tools and templates
echo ✅ Mobile-optimized responsive design
echo ✅ Progressive Web App features
echo ✅ NEW: Drag-and-drop document upload
echo ✅ NEW: Document search and management
echo ✅ NEW: Save boxes for new docs and references
echo.

echo 🌐 **After Deployment, Your Team Gets:**
echo • Link to access from anywhere
echo • Mobile optimized for phones and tablets
echo • Voice control for hands-free operation
echo • Document management system
echo • Practice Panther integration
echo • Legal tools and templates
echo.

echo ⚡ **SPEED DEPLOYMENT - 3 MINUTES:**
echo.

echo 📝 **Step 1: Create GitHub Repository (1 minute)**
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: esqs-platform-online
echo 3. Description: ESQs Platform - Enhanced Synthia-Oracle Online
echo 4. Make it PUBLIC
echo 5. Click "Create repository"
echo.
echo Press any key when repository is created...
pause >nul

echo.
echo 📁 **Step 2: Get Repository URL (30 seconds)**
echo.

set /p REPO_URL="Copy and paste your repository URL here: "

if "%REPO_URL%"=="" (
    echo ❌ No repository URL provided
    echo Please run the script again and enter the URL
    pause
    exit /b 1
)

echo.
echo 🚀 **Step 3: Deploy to GitHub (1 minute)**
echo.

echo Creating deployment folder...
if exist "esqs-quick-deploy" rmdir /s /q "esqs-quick-deploy"
mkdir "esqs-quick-deploy"
cd "esqs-quick-deploy"

echo Cloning repository...
git clone %REPO_URL% .
if errorlevel 1 (
    echo ❌ Failed to clone repository
    echo Please check your repository URL and try again
    pause
    exit /b 1
)

echo Copying ESQs Platform files...
xcopy "F:\ESQs-Platform-MOBILE-ONLINE\*" "." /E /I /Y
if errorlevel 1 (
    echo ❌ Failed to copy files
    echo Please check file paths and try again
    pause
    exit /b 1
)

echo Deploying to GitHub...
git add .
git commit -m "🚀 QUICK DEPLOY: ESQs Platform with Document Management - Team Ready!"
git push origin main

if errorlevel 1 (
    echo ❌ Failed to push to GitHub
    echo Please check your git credentials and try again
    pause
    exit /b 1
)

echo.
echo 🌐 **Step 4: Enable GitHub Pages (30 seconds)**
echo.
echo 1. Go to your repository on GitHub
echo 2. Click Settings tab
echo 3. Scroll down to Pages section
echo 4. Select Source: Deploy from a branch
echo 5. Select Branch: main
echo 6. Click Save
echo.
echo Press any key when GitHub Pages is enabled...
pause >nul

echo.
echo 🎉 **DEPLOYMENT COMPLETE!**
echo.
echo 🌐 **Your Team Link is Ready:**
echo %REPO_URL:https://github.com/=https://%.github.io/esqs-platform-online/
echo.
echo 📱 **Share This Link with Your Team:**
echo • Travis R. Christiansen - Attorney (Full Access)
echo • Josephine ['Jo'] Miller - Legal Assistant (Full Access)
echo • Jordan Gubler - Legal Assistant (Case Access)
echo • John Adams - Attorney (Full Access)
echo.

echo 🚀 **Features Available for Your Team:**
echo ✅ Team member selection and access control
echo ✅ Practice Panther integration with OAuth 2.0
echo ✅ Voice control system (mobile and desktop)
echo ✅ Legal tools and templates
echo ✅ Mobile-optimized responsive design
echo ✅ Progressive Web App features
echo ✅ NEW: Drag-and-drop document upload
echo ✅ NEW: Document search and management
echo ✅ NEW: Save boxes for new docs and references
echo ✅ Offline capability
echo ✅ Cross-platform compatibility
echo.

echo 📋 **Immediate Next Steps:**
echo 1. Copy the link above
echo 2. Send it to your team via email/Slack
echo 3. Test the platform on your phone
echo 4. Try voice commands: "Practice Panther", "Upload document"
echo 5. Test document drag-and-drop
echo.

echo 🎯 **Your Enhanced Synthia-Oracle is now LIVE for your team!**
echo.

echo ========================================
echo           DEPLOYMENT STATUS
echo ========================================
echo.
echo ✅ Repository created
echo ✅ Files deployed
echo ✅ GitHub Pages enabled
echo ✅ Team link ready
echo.
echo 🚀 ESQs Platform is now online for your team!
echo.

echo 🌐 **TEAM LINK:**
echo %REPO_URL:https://github.com/=https://%.github.io/esqs-platform-online/
echo.

pause
