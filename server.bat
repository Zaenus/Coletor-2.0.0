@echo off

:start
echo Starting server...
start node "C:\Users\Zaenus\Documents\Code\Coletor2.0.0\server.js"
echo Server started.

echo Starting start script...
start node "C:\Users\Zaenus\Documents\Code\Coletor2.0.0\start.js"
echo Start script started.

echo Opening localhost:5500 in the default browser...
start chrome "http://localhost:5500"

:check
timeout /t 5 /nobreak >nul
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if "%ERRORLEVEL%"=="0" goto check

echo Server and start script stopped.
pause