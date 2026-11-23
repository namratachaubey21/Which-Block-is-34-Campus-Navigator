@echo off
title Push LPU Campus Navigator to GitHub
echo =======================================================
echo   Uploading LPU Campus Navigator to GitHub
echo   Target: https://github.com/namratachaubey21/Which-Block-is-34-Campus-Navigator
echo =======================================================
echo.
echo Step 1: Checking local Git commit...
git log -1 --oneline
echo.
echo Step 2: Overwriting default remote README with complete project...
git push -u origin main --force
if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Project uploaded to GitHub:
    echo   https://github.com/namratachaubey21/Which-Block-is-34-Campus-Navigator
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo   Upload encountered an issue. Please check your internet
    echo   connection and try running again.
    echo =======================================================
)
echo.
pause
