@echo off
title ESQs Platform - Quick Repository Creator
color 0A

echo.
echo ========================================
echo    ESQs Platform Repository Creator
echo ========================================
echo.
echo This script will open GitHub in your browser
echo to quickly create all 5 team repositories.
echo.
echo Make sure you're logged into GitHub first!
echo.

echo 🚀 Opening GitHub repository creation pages...
echo.

echo 📁 Creating Travis's repository...
start "https://github.com/new?name=esqs-platform-travis&description=ESQs%20Platform%20for%20Travis&public=true&auto_init=true"


timeout /t 3 /nobreak >nul

echo 📁 Creating Jo's repository...
start "https://github.com/new?name=esqs-platform-jo&description=ESQs%20Platform%20for%20Jo&public=true&auto_init=true"

timeout /t 3 /nobreak >nul

echo 📁 Creating Jordan's repository...
start "https://github.com/new?name=esqs-platform-jordan&description=ESQs%20Platform%20for%20Jordan&public=true&auto_init=true"

timeout /t 3 /nobreak >nul

echo 📁 Creating John's repository...
start "https://github.com/new?name=esqs-platform-john&description=ESQs%20Platform%20for%20John&public=true&auto_init=true"

timeout /t 3 /nobreak >nul

echo 📁 Creating Jessica's repository...
start "https://github.com/new?name=esqs-platform-jessica&description=ESQs%20Platform%20for%20Jessica&public=true&auto_init=true"

echo.
echo ✅ All repository creation pages opened!
echo.
echo 📋 **Quick Steps for Each Tab:**
echo 1. Verify repository name is correct
echo 2. Make sure it's set to PUBLIC
echo 3. Click "Create repository"
echo 4. Repeat for all 5 tabs
echo.
echo 🔗 **Repository Names to Create:**
echo • esqs-platform-travis
echo • esqs-platform-jo
echo • esqs-platform-jordan
echo • esqs-platform-john
echo • esqs-platform-jessica
echo.
echo ⏱️ **Estimated Time: 2-3 minutes total**
echo.

pause
