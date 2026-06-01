@echo off
title Alzahraa Portfolio - Git Deployment
color 0b
echo =====================================================================
echo                 ALZAHRAA PORTFOLIO DEPLOYMENT TOOL
echo =====================================================================
echo.
echo This script will initialize a local Git repository, commit all files,
echo and push them directly to your remote repository:
echo https://github.com/zahraaabozaid/portfolio.git
echo.
echo =====================================================================
echo.

:: Step 1: Initialize Repository
echo [Step 1 of 4] Initializing local Git repository...
if not exist .git (
    git init
    if errorlevel 1 (
        color 0c
        echo ERROR: Git is not installed or not found in your system PATH.
        echo Please install Git from https://git-scm.com and try again.
        pause
        exit /b
    )
) else (
    echo Git repository already initialized locally.
)
echo.

:: Step 2: Configure Remote
echo [Step 2 of 4] Configuring remote GitHub origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/zahraaabozaid/portfolio.git
echo Remote set to: https://github.com/zahraaabozaid/portfolio.git
echo.

:: Step 3: Add and Commit
echo [Step 3 of 4] Staging files and creating commit...
git add .
git commit -m "feat: build modern premium portfolio website with responsive design & HSL theme system"
git branch -M main
echo.

:: Step 4: Push to Remote
echo [Step 4 of 4] Pushing code to GitHub (main branch)...
echo.
echo NOTE: If this is your first time pushing, a secure GitHub login pop-up
echo will appear. Please authenticate to complete the push.
echo.
git push -u origin main --force
if errorlevel 1 (
    color 0c
    echo.
    echo ERROR: Push failed. This usually happens if:
    echo 1. You do not have write access to the repository.
    echo 2. The authentication popup was closed or failed.
    echo 3. The remote repository URL is incorrect.
    echo.
    echo Please verify your GitHub access and try running this script again.
) else (
    color 0a
    echo.
    echo =====================================================================
    echo SUCCESS: Your premium portfolio has been deployed to GitHub!
    echo Remote Repo: https://github.com/zahraaabozaid/portfolio.git
    echo =====================================================================
)
echo.
pause
