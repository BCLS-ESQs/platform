@echo off
echo ========================================
echo    ESQs Platform Robust System Startup
echo ========================================
echo.

echo Starting robust service manager...
echo This will automatically:
echo - Start all services
echo - Monitor for crashes
echo - Auto-restart failed services
echo - Perform health checks
echo - Send alerts if services fail
echo.

cd /d "F:\ESQs-Platform-MOBILE-ONLINE"

echo Installing dependencies...
npm install

echo.
echo Starting Service Manager...
node service-manager.js

echo.
echo Service Manager started. All services are now monitored.
echo Press Ctrl+C to stop all services gracefully.
pause
