@echo off
chcp 65001 >nul
echo ========================================
echo   🧪 Probando Backend - Talleres API
echo ========================================
echo.

echo Verificando si el backend está corriendo...
echo.

echo [1] Probando endpoint raíz...
curl -s http://localhost:8000/ 2>nul
if errorlevel 1 (
    echo ❌ Backend NO está corriendo en http://localhost:8000
    echo.
    echo Para iniciar el backend, ejecuta:
    echo   start-backend-only.bat
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Backend respondiendo
)
echo.
echo.

echo [2] Probando endpoint de salud...
curl -s http://localhost:8000/health
echo.
echo.

echo [3] Probando endpoint de testimonios...
curl -s http://localhost:8000/api/v1/testimonios/
echo.
echo.

echo [4] Probando endpoint de estadísticas...
curl -s http://localhost:8000/api/v1/estadisticas/
echo.
echo.

echo [5] Probando endpoint de categorías...
curl -s http://localhost:8000/api/v1/categorias/
echo.
echo.

echo ========================================
echo   ✓ Todas las pruebas completadas
echo ========================================
echo.
echo Si ves datos JSON arriba, el backend está funcionando correctamente.
echo Ahora puedes abrir http://localhost:5173 para ver el frontend.
echo.
pause

