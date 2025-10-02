@echo off
REM ESQs Platform - Universal Synthia Launcher
REM Works from ANY drive without dependencies

echo 🧠 SYNTHIA AI - UNIVERSAL LAUNCHER
echo ================================
echo.

REM Get current drive and directory
for /f "tokens=1" %%i in ('cd') do set CURRENT_DRIVE=%%i
echo 📂 Current Location: %CD%
echo 💾 Drive: %CURRENT_DRIVE%
echo 🌐 Platform Independent: TRUE
echo.

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Check for Synthia files
if exist "synthia-portable.js" (
    echo ✅ Synthia Portable found
    echo 🚀 Starting Synthia AI Chat Interface...
    echo.
    node synthia-portable.js
) else if exist "synthia-integration.js" (
    echo ✅ Synthia Integration found
    echo 🚀 Starting Synthia Integration...
    echo.
    node synthia-integration.js
) else if exist "synthia-chat-interface.js" (
    echo ✅ Synthia Chat found
    echo 🚀 Starting Synthia Chat...
    echo.
    node synthia-chat-interface.js
) else (
    echo ❌ No Synthia files found!
    echo 💡 Tip: Run this from your ESQs platform directory
    echo.
    pause
    exit /b 1
)

echo.
echo 🧠 Synthia session ended.
pause
