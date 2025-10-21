#!/bin/bash

set -e  # Salir si hay algún error

echo "========================================"
echo "  🚀 Iniciando Proyecto Talleres"
echo "========================================"
echo

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "❌ ERROR: Python3 no está instalado"
    echo "Por favor instala Python3 desde https://www.python.org/"
    exit 1
fi

# Verificar pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ ERROR: pnpm no está instalado"
    echo "Instalando pnpm..."
    npm install -g pnpm
    if [ $? -ne 0 ]; then
        echo "❌ Error al instalar pnpm"
        exit 1
    fi
fi

echo "✓ Python y pnpm detectados correctamente"
echo

# Verificar si existe el entorno virtual de Python
if [ ! -d "backend/venv" ]; then
    echo "[BACKEND] 📦 Creando entorno virtual de Python..."
    cd backend
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ Error al crear el entorno virtual"
        exit 1
    fi
    cd ..
    echo "✓ Entorno virtual creado"
else
    echo "✓ Entorno virtual encontrado"
fi

# Activar entorno virtual e instalar dependencias
echo
echo "[BACKEND] 📦 Instalando dependencias de Python..."
cd backend
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "❌ Error al activar el entorno virtual"
    exit 1
fi
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias de Python"
    exit 1
fi
cd ..
echo "✓ Dependencias de Python instaladas"

# Verificar dependencias de pnpm
echo
echo "[FRONTEND] 📦 Instalando dependencias de pnpm..."
cd Talleres
pnpm install
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias de pnpm"
    exit 1
fi
cd ..
echo "✓ Dependencias de pnpm instaladas"

echo
echo "========================================"
echo "  ✓ Todo listo! Iniciando servicios..."
echo "========================================"
echo "  🔧 Backend:  http://localhost:8000"
echo "  🌐 Frontend: http://localhost:5173"
echo "  📚 API Docs: http://localhost:8000/docs"
echo "========================================"
echo
echo "💡 Presiona Ctrl+C para detener los servicios"
echo

# Ejecutar ambos servicios
cd Talleres
pnpm dev:all

