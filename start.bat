@ECHO OFF
cls
:start
echo running script

node sidbot.js

echo restarting in (seconds):
timeout /t 30
pause
goto start
