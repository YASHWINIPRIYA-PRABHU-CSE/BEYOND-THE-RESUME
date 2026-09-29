@echo off
title Beyond The Resume - Frontend Client
echo ========================================================
echo  Starting Beyond the Resume - React 19 Frontend Server
echo ========================================================
echo  Web Application will be at: http://127.0.0.1:5173
echo.
cd /d "%~dp0frontend"
npm run dev -- --host 127.0.0.1 --port 5173
pause
