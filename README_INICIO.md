# 🚀 Guía de Inicio Rápido - Proyecto Talleres

## Requisitos Previos

- **Python 3.8+** instalado
- **Node.js 16+** instalado
- **pnpm** instalado (`npm install -g pnpm`)
- **PostgreSQL** (si usas base de datos)

## 🎯 Inicio Rápido

### Windows
```bash
start.bat
```

### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

## 📦 Lo que hace el script automáticamente:

1. ✅ Crea entorno virtual de Python (si no existe)
2. ✅ Instala dependencias de Python
3. ✅ Instala dependencias de pnpm
4. ✅ Inicia backend y frontend simultáneamente

## 🌐 URLs del Proyecto

Una vez iniciado, puedes acceder a:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🛠️ Comandos Manuales

### Backend (Python/FastAPI)
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

### Frontend (React/Vite)
```bash
cd Talleres
pnpm install
pnpm dev
```

### Ambos al mismo tiempo
```bash
cd Talleres
pnpm dev:all
```

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` basado en `env.example`:

```bash
cd backend
cp env.example .env
# Edita el archivo .env con tus configuraciones
```

## 🛑 Detener los Servicios

Presiona `Ctrl + C` en la terminal para detener ambos servicios.

## 📝 Problemas Comunes

### ❌ Error: "ERR_CONNECTION_REFUSED" - Backend no conecta

Este es el error más común. Significa que el **backend no está corriendo**.

**Solución rápida:**
```bash
# Windows
start.bat

# Solo backend para testing
start-backend-only.bat
```

**Verificar que el backend esté corriendo:**
1. Abre http://localhost:8000/health en tu navegador
2. Deberías ver: `{"status":"healthy","service":"talleres-api"}`
3. Si no funciona, el backend no está corriendo

**Ver documentación completa de errores:** Consulta `SOLUCION_ERRORES.md`

### Error: "pnpm no reconocido"
```bash
npm install -g pnpm
```

### Error: "python no reconocido"
Asegúrate de tener Python instalado y agregado al PATH del sistema.

### Puerto ya en uso
Si los puertos 8000 o 5173 están en uso, puedes:
- Cerrar la aplicación que los está usando
- Modificar los puertos en `backend/main.py` y `Talleres/vite.config.ts`

### Las reseñas/estadísticas no cargan

1. **Verifica que el backend esté corriendo** (ve a http://localhost:8000/docs)
2. Prueba los endpoints manualmente:
   - http://localhost:8000/api/v1/testimonios/
   - http://localhost:8000/api/v1/estadisticas/
3. Revisa la consola del navegador para ver los errores específicos
4. Revisa los logs del backend en la terminal

## 📚 Más Información

- **Solución de Errores Detallada:** `SOLUCION_ERRORES.md` ⭐
- Consulta `backend/README.md` para más detalles del backend
- Consulta `Talleres/README.md` para más detalles del frontend

