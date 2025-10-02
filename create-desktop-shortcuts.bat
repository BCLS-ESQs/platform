@echo off
echo 🚀 Creating Desktop Shortcuts for ESQs Platform
echo ================================================
echo.
echo This will create desktop shortcuts that act like "doors" to your legal workspace
echo.

REM Get desktop path
for /f "tokens=3" %%i in ('reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders" /v Desktop 2^>nul') do set DESKTOP=%%i

echo 📁 Desktop path: %DESKTOP%

echo.
echo 🔗 Creating ESQs Platform Main Access Shortcut...
echo @echo off > "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo 🚀 Opening ESQs Platform - Your Legal Workspace Door >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo ================================================ >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo. >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo 🌐 Opening main platform... >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo start http://localhost:3000 >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo. >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo ✅ ESQs Platform is opening in your browser! >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo echo 🚪 This is your always-open door to your legal workspace >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"
echo pause >> "%DESKTOP%\🚀 ESQs Platform - Legal Workspace.bat"

echo.
echo 🔗 Creating Practice Panther Quick Access Shortcut...
echo @echo off > "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo echo 📋 Opening Practice Panther Cases >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo echo ================================================ >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo echo. >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo echo 🌐 Opening Practice Panther cases... >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo start http://localhost:3000/api/practice-panther/cases >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo echo. >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo echo ✅ Practice Panther cases are loading! >> "%DESKTOP%\📋 Practice Panther - Cases.bat"
echo pause >> "%DESKTOP%\📋 Practice Panther - Cases.bat"

echo.
echo 🔗 Creating F: Drive Quick Access Shortcut...
echo @echo off > "%DESKTOP%\📁 F: Drive - Files.bat"
echo echo 📁 Opening F: Drive File Browser >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo echo ================================================ >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo echo. >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo echo 🌐 Opening F: Drive browser... >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo start http://localhost:3000/api/f-drive/browse >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo echo. >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo echo ✅ F: Drive browser is loading! >> "%DESKTOP%\📁 F: Drive - Files.bat"
echo pause >> "%DESKTOP%\📁 F: Drive - Files.bat"

echo.
echo 🔗 Creating Health Check Shortcut...
echo @echo off > "%DESKTOP%\💚 ESQs Health Check.bat"
echo echo 💚 ESQs Platform Health Check >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo echo ================================================ >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo echo. >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo echo 🌐 Checking platform health... >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo start http://localhost:3000/api/health >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo echo. >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo echo ✅ Health check is loading! >> "%DESKTOP%\💚 ESQs Health Check.bat"
echo pause >> "%DESKTOP%\💚 ESQs Health Check.bat"

echo.
echo 🔗 Creating Frontend HTML Shortcut...
echo @echo off > "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo echo 🌐 Opening ESQs Platform Frontend >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo echo ================================================ >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo echo. >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo echo 📁 Opening frontend HTML file... >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo start "%~dp0index.html" >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo echo. >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo echo ✅ Frontend is opening! >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"
echo pause >> "%DESKTOP%\🌐 ESQs Frontend - HTML.bat"

echo.
echo ✅ Desktop shortcuts created successfully!
echo.
echo 🚪 You now have these "doors" to your legal workspace:
echo.
echo 🚀 ESQs Platform - Legal Workspace.bat
echo    → Opens main platform in browser
echo.
echo 📋 Practice Panther - Cases.bat  
echo    → Direct access to your cases
echo.
echo 📁 F: Drive - Files.bat
echo    → Direct access to your files
echo.
echo 💚 ESQs Health Check.bat
echo    → Check if everything is running
echo.
echo 🌐 ESQs Frontend - HTML.bat
echo    → Open the HTML frontend directly
echo.
echo 🎯 These shortcuts will work anytime - like having permanent doors open!
echo.
pause
