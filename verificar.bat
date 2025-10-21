@echo off
chcp 65001 >nul
echo ========================================
echo   🔍 Verificación del Sistema
echo ========================================
echo.

echo [1/6] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python NO está instalado
    echo    Descarga Python desde: https://www.python.org/
) else (
    python --version
    echo ✓ Python instalado correctamente
)
echo.

echo [2/6] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js NO está instalado
    echo    Descarga Node.js desde: https://nodejs.org/
) else (
    node --version
    echo ✓ Node.js instalado correctamente
)
echo.

echo [3/6] Verificando pnpm...
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pnpm NO está instalado
    echo    Instálalo con: npm install -g pnpm
) else (
    pnpm --version
    echo ✓ pnpm instalado correctamente
)
echo.

echo [4/6] Verificando entorno virtual de Python...
if exist "backend\venv" (
    echo ✓ Entorno virtual encontrado en backend\venv
) else (
    echo ⚠ Entorno virtual NO encontrado
    echo    Se creará al ejecutar start.bat
)
echo.

echo [5/6] Verificando dependencias de pnpm...
if exist "Talleres\node_modules" (
    echo ✓ Dependencias de pnpm instaladas
) else (
    echo ⚠ Dependencias de pnpm NO instaladas
    echo    Se instalarán al ejecutar start.bat
)
echo.

echo [6/6] Verificando puertos...
echo Verificando puerto 8000 (Backend)...
netstat -ano | findstr :8000 >nul 2>&1
if errorlevel 1 (
    echo ✓ Puerto 8000 disponible
) else (
    echo ⚠ Puerto 8000 en uso
    echo    Procesos usando el puerto:
    netstat -ano | findstr :8000
)
echo.

echo Verificando puerto 5173 (Frontend)...
netstat -ano | findstr :5173 >nul 2>&1
if errorlevel 1 (
    echo ✓ Puerto 5173 disponible
) else (
    echo ⚠ Puerto 5173 en uso
    echo    Procesos usando el puerto:
    netstat -ano | findstr :5173
)
echo.

echo ========================================
echo   Resumen de Verificación
echo ========================================
echo.
echo Si todo está marcado con ✓, puedes ejecutar:
echo   start.bat
echo.
echo Si hay errores ❌, instala los programas faltantes.
echo Si hay advertencias ⚠, el script las resolverá automáticamente.
echo.
echo Para más ayuda, consulta: SOLUCION_ERRORES.md
echo.
pause

