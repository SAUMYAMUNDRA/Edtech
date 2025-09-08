@echo off
SETLOCAL

REM Save current directory
SET ROOT_DIR=%CD%

REM Start client (in a new window)
cd /d "%ROOT_DIR%\client"
start cmd /k "npm run dev"

REM Start server (in a new window)
cd /d "%ROOT_DIR%\server"
start cmd /k "node index.js"


ENDLOCAL
pause
