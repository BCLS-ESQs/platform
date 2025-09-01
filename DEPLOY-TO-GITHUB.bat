@echo off
title ESQs Platform - Deploy to GitHub Pages
color 0A

echo.
echo ========================================
echo    ESQs Platform - Deploy to GitHub
echo    Make Available Online for Everyone
echo ========================================
echo.

echo 🚀 **Deploying ESQs Platform to GitHub Pages**
echo.
echo This will make your Enhanced Synthia-Oracle system
echo available online and mobile for everyone worldwide!
echo.

echo 📋 **What Will Be Deployed:**
echo • Team member selection and access control
echo • Practice Panther integration with OAuth 2.0
echo • Voice control system for mobile and desktop
echo • Legal tools and templates
echo • Mobile-optimized responsive design
echo • Progressive Web App features
echo.

echo 🌐 **After Deployment, Your Platform Will Be:**
echo • Available online for everyone
echo • Mobile optimized for phones and tablets
echo • Accessible from any web browser
echo • Free hosting with automatic HTTPS
echo • Global CDN for fast loading
echo.

echo 🔧 **Prerequisites:**
echo • GitHub account
echo • Git installed on your computer
echo • Repository created on GitHub
echo.

echo 📝 **Step 1: Create GitHub Repository**
echo.
echo Go to https://github.com/new
echo Create repository: esqs-platform-online
echo Make it PUBLIC
echo Description: ESQs Platform - Enhanced Synthia-Oracle Online
echo.
echo Press any key when repository is created...
pause >nul

echo.
echo 📁 **Step 2: Clone Repository**
echo.

set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/esqs-platform-online): "

if "%REPO_URL%"=="" (
    echo ❌ No repository URL provided
    echo Please run the script again and enter the URL
    pause
    exit /b 1
)

echo.
echo 🚀 Cloning repository...
git clone %REPO_URL% esqs-platform-online
if errorlevel 1 (
    echo ❌ Failed to clone repository
    echo Please check your repository URL and try again
    pause
    exit /b 1
)

echo ✅ Repository cloned successfully
echo.

echo 📁 **Step 3: Copy Platform Files**
echo.

cd esqs-platform-online

echo Copying ESQs Platform files...
xcopy "F:\ESQs-Platform-MOBILE-ONLINE\*" "." /E /I /Y
if errorlevel 1 (
    echo ❌ Failed to copy files
    echo Please check file paths and try again
    pause
    exit /b 1
)

echo ✅ Files copied successfully
echo.

echo 📤 **Step 4: Deploy to GitHub**
echo.

echo Adding files to git...
git add .
if errorlevel 1 (
    echo ❌ Failed to add files
    pause
    exit /b 1
)

echo Committing changes...
git commit -m "🚀 Initial ESQs Platform Online deployment - Enhanced Synthia-Oracle available for everyone"
if errorlevel 1 (
    echo ❌ Failed to commit changes
    pause
    exit /b 1
)

echo Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ Failed to push to GitHub
    echo Please check your git credentials and try again
    pause
    exit /b 1
)

echo ✅ Successfully pushed to GitHub!
echo.

echo 🌐 **Step 5: Enable GitHub Pages**
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
echo 🌐 **Your ESQs Platform is now available online at:**
echo %REPO_URL:https://github.com/=https://%.github.io/esqs-platform-online/
echo.
echo 📱 **Access from any device:**
echo • Mobile phones (fully optimized)
echo • Tablets (responsive design)
echo • Desktop computers (professional interface)
echo • Any web browser (cross-platform)
echo.

echo 🚀 **Features Available for Everyone:**
echo ✅ Team member selection and access control
echo ✅ Practice Panther integration with OAuth 2.0
echo ✅ Voice control system (mobile and desktop)
echo ✅ Legal tools and templates
echo ✅ Mobile-optimized responsive design
echo ✅ Progressive Web App features
echo ✅ Offline capability
echo ✅ Cross-platform compatibility
echo.

echo 📋 **Next Steps:**
echo 1. Test your platform on different devices
echo 2. Share the URL with your team
echo 3. Test voice control on mobile devices
echo 4. Verify Practice Panther integration
echo 5. Check performance on mobile networks
echo.

echo 🎯 **Your Enhanced Synthia-Oracle is now available to the world!**
echo.

echo ========================================
echo           DEPLOYMENT STATUS
echo ========================================
echo.
echo ✅ Repository cloned
echo ✅ Files copied
echo ✅ Changes committed
echo ✅ Pushed to GitHub
echo ✅ GitHub Pages enabled
echo.
echo 🚀 ESQs Platform is now online and mobile for everyone!
echo.

pause
