@echo off
cd /d "%~dp0"
echo Baixando imagens oficiais de drembelem.com.br...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\baixar-e-otimizar.ps1"
echo.
pause
