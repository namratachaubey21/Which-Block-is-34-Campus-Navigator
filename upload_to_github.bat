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
echo Step 2: Pushing 'main' branch to GitHub...
echo If a browser window opens, please click 'Sign in with your browser' to authorize Git.
echo.
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Project uploaded to GitHub:
    echo   https://github.com/namratachaubey21/Which-Block-is-34-Campus-Navigator
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo   If upload failed because the repository does not exist yet:
    echo   1. Go to: https://github.com/new
    echo   2. Set Repository name to: Which-Block-is-34-Campus-Navigator
    echo   3. Keep it Public, and leave "Add a README" UNCHECKED
    echo   4. Click "Create repository"
    echo   5. Double-click this upload_to_github.bat file again!
    echo =======================================================
)
echo.
pause
