@echo off
echo ======================================
echo Quick Fix: Open TA WebApp on Port 5177
echo ======================================
echo.

echo Step 1: Opening default browser to http://localhost:5177
start http://localhost:5177
echo.

echo Step 2: Opening in Chrome (if installed)
start chrome http://localhost:5177
echo.

echo Step 3: Opening in Edge (if installed)
start msedge http://localhost:5177
echo.

echo ======================================
echo IMPORTANT INSTRUCTIONS:
echo ======================================
echo 1. Press Ctrl + Shift + R to hard refresh
echo 2. Or press F12, right-click refresh, select "Empty Cache and Hard Reload"
echo 3. Look for the globe icon in the header
echo 4. Click it to switch language
echo.

echo If browser doesn't open, manually copy this URL:
echo http://localhost:5177
echo.

pause
