@echo off
echo 🚀 ESQs Platform - ONE-CLICK Always-On Setup
echo ================================================
echo.
echo This will transform your ESQs Platform into an always-accessible service
echo that starts automatically and provides instant access to your legal workspace.
echo.
echo 🎯 What you'll get:
echo ✅ Windows Service that starts automatically
echo ✅ Desktop shortcuts for instant access
echo ✅ Always-on backend API
echo ✅ Self-healing if anything goes wrong
echo ✅ Like having a door that's always open!
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running as Administrator - Perfect!
) else (
    echo ❌ This script must run as Administrator
    echo Right-click and "Run as Administrator"
    echo.
    echo This is required to install the Windows service.
    pause
    exit /b 1
)

echo.
echo 🚀 Step 1: Installing Windows Service...
call install-windows-service.bat

echo.
echo 🚀 Step 2: Creating Desktop Shortcuts...
call create-desktop-shortcuts.bat

echo.
echo 🚀 Step 3: Ensuring Service is Running...
call ensure-service-running.bat

echo.
echo 🎉 SETUP COMPLETE! Your ESQs Platform is now:
echo.
echo 🚪 **ALWAYS ACCESSIBLE** - Like having a door that never closes!
echo ✅ **Starts automatically** when Windows boots
echo ✅ **Runs continuously** in the background
echo ✅ **Self-healing** if anything goes wrong
echo ✅ **Instant access** via desktop shortcuts
echo.
echo 🌐 **Access Your Legal Workspace Anytime:**
echo    • Main Platform: http://localhost:3000
echo    • Practice Panther: Direct case access
echo    • F: Drive: Direct file access
echo    • Health Check: System status
echo.
echo 🎯 **Desktop Shortcuts Created:**
echo    • 🚀 ESQs Platform - Legal Workspace.bat
echo    • 📋 Practice Panther - Cases.bat
echo    • 📁 F: Drive - Files.bat
echo    • 💚 ESQs Health Check.bat
echo    • 🌐 ESQs Frontend - HTML.bat
echo.
echo 🚪 **Your legal workspace door is now always open!**
echo **Double-click any shortcut to access instantly.**
echo.
echo 🔄 **To manage the service:**
echo    • View status: pm2 status
echo    • Restart: pm2 restart ESQs-Platform
echo    • Stop: pm2 stop ESQs-Platform
echo    • Logs: pm2 logs ESQs-Platform
echo.
pause
