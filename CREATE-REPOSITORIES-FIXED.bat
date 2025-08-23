@echo off
title ESQs Platform - Quick Repository Creator (FIXED)
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
start "https://github.com/new?name=esqs-platform-travis&description=ESQs%20Platform%20for%20Travis%20-%20Attorney%20with%20Full%20Access&public=true&auto_init=true&gitignore_template=Node&license_template=mit"

timeout /t 3 /nobreak >nul

echo 📁 Creating Jo's repository...
start "https://github.com/new?name=esqs-platform-jo&description=ESQs%20Platform%20for%20Jo%20-%20Legal%20Assistant%20with%20Full%20Access&public=true&auto_init=true&gitignore_template=Node&license_template=mit"

timeout /t 3 /nobreak >nul

echo 📁 Creating Jordan's repository...
start "https://github.com/new?name=esqs-platform-jordan&description=ESQs%20Platform%20for%20Jordan%20-%20Legal%20Assistant%20with%20Case%20Access&public=true&auto_init=true&gitignore_template=Node&license_template=mit"

timeout /t 3 /nobreak >nul

echo 📁 Creating John's repository...
start "https://github.com/new?name=esqs-platform-john&description=ESQs%20Platform%20for%20John%20-%20Attorney%20with%20Full%20Access&public=true&auto_init=true&gitignore_template=Node&license_template=mit"

timeout /t 3 /nobreak >nul

echo 📁 Creating Jessica's repository...
start "https://github.com/new?name=esqs-platform-jessica&description=ESQs%20Platform%20for%20Jessica%20-%20Legal%20Assistant%20with%20Case%20Access&public=true&auto_init=true&gitignore_template=Node&license_template=mit"

echo.
echo ✅ All repository creation pages opened!
echo.
echo 📋 **What Should Be Pre-filled on Each Tab:**
echo.
echo Tab 1: esqs-platform-travis (Travis - Attorney, Full Access)
echo Tab 2: esqs-platform-jo (Jo - Legal Assistant, Full Access)
echo Tab 3: esqs-platform-jordan (Jordan - Legal Assistant, Case Access)
echo Tab 4: esqs-platform-john (John - Attorney, Full Access)
echo Tab 5: esqs-platform-jessica (Jessica - Legal Assistant, Case Access)
echo.
echo 🔧 **If Forms Are Not Pre-filled:**
echo 1. Manually type repository name (e.g., "esqs-platform-travis")
echo 2. Make sure "Public" is selected
echo 3. Add description if needed
echo 4. Click "Create repository"
echo.
echo ⏱️ **Estimated Time: 2-3 minutes total**
echo.

pause
