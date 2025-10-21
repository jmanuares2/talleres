@echo off
chcp 65001 >nul
echo ========================================
echo   🚀 Iniciando Proyecto Talleres
echo ========================================
echo.

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python no está instalado o no está en el PATH
    echo Por favor instala Python desde https://www.python.org/
    pause
    exit /b 1
)

REM Verificar pnpm
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: pnpm no está instalado
    echo Instalando pnpm...
    npm install -g pnpm
    if errorlevel 1 (
        echo ❌ Error al instalar pnpm
        pause
        exit /b 1
    )
)

echo ✓ Python y pnpm detectados correctamente
echo.

REM Verificar si existe el entorno virtual de Python
if not exist "backend\venv" (
    echo [BACKEND] 📦 Creando entorno virtual de Python...
    cd backend
    python -m venv venv
    if errorlevel 1 (
        echo ❌ Error al crear el entorno virtual
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo ✓ Entorno virtual creado
) else (
    echo ✓ Entorno virtual encontrado
)

REM Activar entorno virtual e instalar dependencias
echo.
echo [BACKEND] 📦 Instalando dependencias de Python...
cd backend
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ❌ Error al activar el entorno virtual
    cd ..
    pause
    exit /b 1
)
pip install -q -r requirements.txt
if errorlevel 1 (
    echo ❌ Error al instalar dependencias de Python
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✓ Dependencias de Python instaladas

REM Verificar dependencias de pnpm
echo.
echo [FRONTEND] 📦 Instalando dependencias de pnpm...
cd Talleres
call pnpm install
if errorlevel 1 (
    echo ❌ Error al instalar dependencias de pnpm
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✓ Dependencias de pnpm instaladas

echo.
echo ========================================
echo   ✓ Todo listo! Iniciando servicios...
echo ========================================
echo   🔧 Backend:  http://localhost:8000
echo   🌐 Frontend: http://localhost:5173
echo   📚 API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo 💡 Presiona Ctrl+C para detener los servicios
echo.

REM Ejecutar ambos servicios
cd Talleres
pnpm dev:all

pause

