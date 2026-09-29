#!/usr/bin/env bash
echo "==================================================================="
echo "  BEYOND THE RESUME: AI Career Intelligence Platform"
echo "  Starting Backend (FastAPI :8000) & Frontend (Vite :5173)..."
echo "==================================================================="
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Start backend in background
echo "Starting backend server..."
(cd "$DIR/backend" && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload) &
BACKEND_PID=$!

sleep 3

# Start frontend in background
echo "Starting frontend dev server..."
(cd "$DIR/frontend" && npm run dev -- --host 127.0.0.1 --port 5173) &
FRONTEND_PID=$!

echo ""
echo "==================================================================="
echo "  Servers are running!"
echo "  - Backend API: http://127.0.0.1:8000/docs"
echo "  - Frontend App: http://127.0.0.1:5173"
echo "  Press Ctrl+C to terminate both servers."
echo "==================================================================="

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM EXIT
wait
