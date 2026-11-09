@echo off
title Heapsort Interativo - Servidor Local
echo ========================================================
echo   Iniciando Heapsort Visualizer para Apresentacao...
echo ========================================================
echo.

cd /d "%~dp0\view"

REM Tenta iniciar via Python se disponivel
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Iniciando servidor local com Python na porta 3000...
    start http://localhost:3000
    python -m http.server 3000
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Iniciando servidor local com Py na porta 3000...
    start http://localhost:3000
    py -m http.server 3000
    goto end
)

REM Se nao tiver python, abre direto no navegador padrao
echo Python nao encontrado. Abrindo diretamente no navegador...
start index.html

:end
