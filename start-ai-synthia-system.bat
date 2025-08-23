@echo off
title AI-Synthia Bridge System Startup
color 0A

echo.
echo ========================================
echo    AI-SYNTHIA BRIDGE SYSTEM STARTUP
echo ========================================
echo.
echo Starting complete AI-Synthia integration...
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Dependency installation failed!
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully
echo.

echo [2/4] Starting Backend Server (Port 3000)...
start "ESQs Backend Server" cmd /k "npm start"
timeout /t 3 /nobreak >nul
echo ✅ Backend server started
echo.

echo [3/4] Starting AI-Synthia Bridge (Port 3001)...
start "AI-Synthia Bridge" cmd /k "node ai-synthia-bridge.js"
timeout /t 3 /nobreak >nul
echo ✅ AI-Synthia bridge started
echo.

echo [4/4] Starting Synthia Integration (Port 3002)...
start "Synthia Integration" cmd /k "node synthia-integration.js"
timeout /t 3 /nobreak >nul
echo ✅ Synthia integration started
echo.

echo ========================================
echo           SYSTEM STATUS
echo ========================================
echo.
echo 🌐 Backend Server: http://localhost:3000
echo 🔗 AI-Synthia Bridge: http://localhost:3001
echo 🧠 Synthia Integration: http://localhost:3002
echo.
echo 📊 Health Checks:
echo    Backend: http://localhost:3000/api/health
echo    Bridge:  http://localhost:3001/ai/status
echo    Synthia: http://localhost:3002/synthia/health
echo.
echo 🔍 Bridge Logs: http://localhost:3001/bridge/logs
echo 📚 Code Registry: http://localhost:3002/synthia/registry
echo.
echo ========================================
echo.
echo 🚀 All systems are now running!
echo.
echo The AI-Synthia bridge system provides:
echo • Continuous code verification between AI and Synthia
echo • Real-time code analysis and security checks
echo • Automated update notifications and recommendations
echo • Code integrity monitoring and pattern recognition
echo.
echo Press any key to open the health check dashboard...
pause >nul

echo.
echo Opening health check dashboard...
start "http://localhost:3001/ai/status"
start "http://localhost:3002/synthia/health"
start "http://localhost:3000/api/health"

echo.
echo ✅ System startup complete!
echo All components are now accessible and monitoring each other.
echo.
pause
