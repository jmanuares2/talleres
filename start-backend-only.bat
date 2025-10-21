@echo off
chcp 65001 >nul
echo ========================================
echo   🔧 Iniciando SOLO Backend - Talleres
echo ========================================
echo.

REM Verificar si existe el entorno virtual de Python
if not exist "backend\venv" (
    echo [BACKEND] 📦 Creando entorno virtual de Python...
    cd backend
    python -m venv venv
    cd ..
)

echo [BACKEND] 📦 Instalando dependencias...
cd backend
call venv\Scripts\activate.bat
pip install -q -r requirements.txt

echo.
echo ========================================
echo   ✓ Iniciando Backend...
echo ========================================
echo   🔧 Backend:  http://localhost:8000
echo   📚 API Docs: http://localhost:8000/docs
echo ========================================
echo.

python main.py

pause

