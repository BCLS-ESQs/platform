@echo off
title Render Keep-Alive Service
color 0A
echo.
echo ===================================
echo   RENDER KEEP-ALIVE SERVICE
echo   Preventing Free Tier Sleep
echo ===================================
echo.
echo Starting service...
echo Target: https://esqs-platform-mobile-online.onrender.com
echo Interval: Every 14 minutes
echo.
node render-keepalive.js
pause
