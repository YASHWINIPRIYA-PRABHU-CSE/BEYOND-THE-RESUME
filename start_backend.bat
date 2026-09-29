@echo off
title Beyond The Resume - Backend API
echo ========================================================
echo  Starting Beyond the Resume - FastAPI Backend Server
echo ========================================================
echo  API Documentation will be at: http://127.0.0.1:8000/docs
echo.
cd /d "%~dp0backend"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
