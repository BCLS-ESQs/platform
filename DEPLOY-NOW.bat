@echo off
title ESQs Platform - DEPLOY NOW
color 0A

echo.
echo ========================================
echo    ESQs Platform - DEPLOY NOW
echo    Get Your Team Links in 2 Minutes!
echo ========================================
echo.

echo 🚀 **DEPLOYING ESQs Platform NOW**
echo.

set /p GITHUB_USERNAME="Enter your GitHub username: "

if "%GITHUB_USERNAME%"=="" (
    echo ❌ No username provided
    pause
    exit /b 1
)

echo.
echo ✅ Username: %GITHUB_USERNAME%
echo 🚀 Starting deployment...
echo.

REM Create deployment folder
if exist "esqs-deploy" rmdir /s /q "esqs-deploy"
mkdir "esqs-deploy"
cd "esqs-deploy"

echo 📁 Creating repository...
git init
git remote add origin https://github.com/%GITHUB_USERNAME%/esqs-platform-online.git

echo 📂 Copying files...
xcopy "F:\ESQs-Platform-MOBILE-ONLINE\*" "." /E /I /Y

echo 🚀 Deploying to GitHub...
git add .
git commit -m "🚀 ESQs Platform with Team Member Links - Deployed!"
git branch -M main
git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ❌ **DEPLOYMENT FAILED**
    echo.
    echo Please create the repository first:
    echo 1. Go to: https://github.com/new
    echo 2. Name: esqs-platform-online
    echo 3. Make it PUBLIC
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo 🎉 **DEPLOYMENT SUCCESSFUL!**
echo.

echo 🌐 **Your Team Links Are Ready:**
echo.
echo 👨‍💼 Travis: https://%GITHUB_USERNAME%.github.io/esqs-platform-online/?user=travis
echo 👩‍💼 Jo: https://%GITHUB_USERNAME%.github.io/esqs-platform-online/?user=jo
echo 👨‍💼 Jordan: https://%GITHUB_USERNAME%.github.io/esqs-platform-online/?user=jordan
echo 👨‍💼 John: https://%GITHUB_USERNAME%.github.io/esqs-platform-online/?user=john
echo.

echo 📱 **Enable GitHub Pages:**
echo 1. Go to: https://github.com/%GITHUB_USERNAME%/esqs-platform-online
echo 2. Settings → Pages → Source: Deploy from branch → main
echo 3. Save
echo.

echo 🎯 **Your team can now access the platform!**
echo.

pause
