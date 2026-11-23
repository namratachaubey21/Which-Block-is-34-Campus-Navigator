@echo off
title LPU Campus Navigator - P10: Which Block is 34?
color 0A
cls
echo ====================================================================
echo        LPU SMART CAMPUS NAVIGATOR - P10: WHICH BLOCK IS 34?
echo         Design Thinking CA2 Project - Lovely Professional Univ
echo ====================================================================
echo.
echo [1/3] Checking Node.js environment...

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Node.js was not detected in PATH.
    echo Opening application directly in your web browser (Standalone Client Mode)...
    start "" "index.html"
    echo.
    echo Application launched in browser.
    pause
    exit /b
)

echo [OK] Node.js is available.
echo [2/3] Starting Production Backend Server (Port 3000)...
echo.
echo Server will run at: http://localhost:3000
echo Survey API:         http://localhost:3000/api/survey-data
echo Healthcheck:        http://localhost:3000/api/health
echo.
echo [3/3] Opening your default web browser...
start "" "http://localhost:3000"

echo.
echo ====================================================================
echo  SERVER IS RUNNING! (Press Ctrl+C to stop the server)
echo ====================================================================
echo.
node server.js
pause
