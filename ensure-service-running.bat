@echo off
echo 🔄 Ensuring ESQs Platform Service is Running
echo ================================================
echo.

REM Check if PM2 is installed
pm2 --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ PM2 not found. Installing PM2...
    npm install -g pm2
    if %errorLevel% neq 0 (
        echo ❌ Failed to install PM2. Please run as Administrator.
        pause
        exit /b 1
    )
)

echo.
echo 🔍 Checking ESQs Platform service status...
pm2 describe ESQs-Platform >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ ESQs Platform service not found. Starting it...
    pm2 start backend-server.js --name "ESQs-Platform"
    pm2 save
    echo ✅ Service started and saved.
) else (
    echo ✅ ESQs Platform service found.
    echo 🔄 Restarting to ensure it's fresh...
    pm2 restart ESQs-Platform
    echo ✅ Service restarted.
)

echo.
echo 📊 Current PM2 Status:
pm2 status

echo.
echo 🌐 ESQs Platform should now be accessible at:
echo    • Main Platform: http://localhost:3000
echo    • Health Check: http://localhost:3000/api/health
echo    • Practice Panther: http://localhost:3000/api/practice-panther/cases
echo    • F: Drive: http://localhost:3000/api/f-drive/browse
echo.
echo 🚪 Your legal workspace door is now open and ready!
echo.
pause
