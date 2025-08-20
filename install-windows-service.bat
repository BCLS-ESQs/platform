@echo off
echo 🚀 Installing ESQs Platform as Windows Service
echo ================================================
echo.
echo This will install ESQs Platform as a Windows Service that:
echo ✅ Starts automatically when Windows boots
echo ✅ Runs continuously in the background
echo ✅ Restarts automatically if it crashes
echo ✅ Provides a permanent "door" to your legal workspace
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running as Administrator - Good!
) else (
    echo ❌ This script must run as Administrator
    echo Right-click and "Run as Administrator"
    pause
    exit /b 1
)

echo.
echo 📦 Installing PM2 globally...
npm install -g pm2

echo.
echo 🔧 Installing PM2 Windows Service...
pm2 install pm2-windows-startup

echo.
echo 🚀 Starting ESQs Platform with PM2...
pm2 start backend-server.js --name "ESQs-Platform"

echo.
echo 💾 Saving PM2 configuration...
pm2 save

echo.
echo 🔄 Setting up auto-restart...
pm2 startup

echo.
echo 📋 Current PM2 Status:
pm2 status

echo.
echo 🌐 Your ESQs Platform is now:
echo ✅ Running as a Windows Service
echo ✅ Accessible at: http://localhost:3000
echo ✅ Will start automatically on boot
echo ✅ Always available - like an open door!
echo.
echo 🔗 Quick Access Links:
echo    • Main Platform: http://localhost:3000
echo    • Health Check: http://localhost:3000/api/health
echo    • Practice Panther: http://localhost:3000/api/practice-panther/cases
echo    • F: Drive: http://localhost:3000/api/f-drive/browse
echo.
echo 🎯 To manage the service:
echo    • View status: pm2 status
echo    • Restart: pm2 restart ESQs-Platform
echo    • Stop: pm2 stop ESQs-Platform
echo    • Logs: pm2 logs ESQs-Platform
echo.
pause
