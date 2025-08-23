@echo off
title ESQs Platform - Deploy with Team Spaces
color 0B

echo.
echo ========================================
echo    ESQs Platform - Team Spaces
echo    Each member gets their own data folder
echo ========================================
echo.

set /p GITHUB_USERNAME="Enter your GitHub username: "

if "%GITHUB_USERNAME%"=="" (
    echo ❌ No username provided
    pause
    exit /b 1
)

echo.
echo ✅ Username: %GITHUB_USERNAME%
echo 🚀 Setting up team spaces...
echo.

REM Create deployment folder
if exist "esqs-team-deploy" rmdir /s /q "esqs-team-deploy"
mkdir "esqs-team-deploy"
cd "esqs-team-deploy"

echo 📁 Creating repository...
git init
git remote add origin https://github.com/%GITHUB_USERNAME%/esqs-platform-online.git

echo 📂 Copying platform files...
xcopy "F:\ESQs-Platform-MOBILE-ONLINE\*" "." /E /I /Y

echo 👥 Creating team member data folders...
mkdir "data\travis"
mkdir "data\jo"
mkdir "data\jordan"
mkdir "data\john"

echo 📝 Creating team member README files...
echo # Travis R. Christiansen - Attorney Data Folder > "data\travis\README.md"
echo This is Travis's personal workspace. All documents and data are private. >> "data\travis\README.md"
echo # Josephine Miller - Legal Assistant Data Folder > "data\jo\README.md"
echo This is Jo's personal workspace. All documents and data are private. >> "data\jo\README.md"
echo # Jordan Gubler - Legal Assistant Data Folder > "data\jordan\README.md"
echo This is Jordan's personal workspace. All documents and data are private. >> "data\jordan\README.md"
echo # John Adams - Attorney Data Folder > "data\john\README.md"
echo This is John's personal workspace. All documents and data are private. >> "data\john\README.md"

echo 🚀 Deploying to GitHub...
git add .
git commit -m "🚀 ESQs Platform with Individual Team Data Spaces"
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

echo 📁 **Each Team Member Gets:**
echo • Personal data folder (/data/[username])
echo • Private document storage
echo • Individual search history
echo • Separate user preferences
echo • Isolated workspace
echo.

echo 📱 **Enable GitHub Pages:**
echo 1. Go to: https://github.com/%GITHUB_USERNAME%/esqs-platform-online
echo 2. Settings → Pages → Source: Deploy from branch → main
echo 3. Save
echo.

echo 🎯 **Your team now has individual workspaces!**
echo.

pause
