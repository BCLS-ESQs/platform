@echo off
echo 🚀 Starting ESQs Platform - Frontend + Backend
echo ================================================

echo.
echo 📡 Starting Backend Server...
start "ESQs Backend Server" cmd /k "npm start"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo 🌐 Opening Frontend in Browser...
start http://localhost:3000

echo.
echo 📁 Opening Frontend File (Alternative)...
start index.html

echo.
echo ✅ Both Frontend and Backend are starting!
echo.
echo 📋 Instructions:
echo    1. Backend server will run in a new command window
echo    2. Frontend will open in your default browser
echo    3. If backend fails, check the command window for errors
echo    4. Make sure you have Node.js installed and dependencies installed
echo.
echo 🔧 To install dependencies first, run: npm install
echo.
pause
