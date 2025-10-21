# 🔧 Solución de Errores Comunes

## ❌ Error: "ERR_CONNECTION_REFUSED" - Backend no conecta

### Problema
El frontend muestra errores como:
```
Failed to load resource: net::ERR_CONNECTION_REFUSED :8000/api/v1/estadisticas/
Failed to load resource: net::ERR_CONNECTION_REFUSED :8000/api/v1/testimonios/
```

### Soluciones

#### 1. Verificar que el Backend esté corriendo

**Opción A: Ejecutar el proyecto completo**
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh
./start.sh
```

**Opción B: Ejecutar solo el backend para testing**
```bash
# Windows
start-backend-only.bat

# Linux/Mac - Manual
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate.bat  # Windows
pip install -r requirements.txt
python main.py
```

#### 2. Verificar que el puerto 8000 esté disponible

**Windows:**
```bash
netstat -ano | findstr :8000
```

**Linux/Mac:**
```bash
lsof -i :8000
```

Si el puerto está en uso, puedes:
- Cerrar el proceso que lo está usando
- Cambiar el puerto en `backend/main.py` (línea final, cambiar `port=8000`)

#### 3. Verificar las URLs en la consola del navegador

Una vez que ejecutes el backend, deberías poder acceder a:

- ✅ http://localhost:8000 - Página de bienvenida
- ✅ http://localhost:8000/health - Estado del servicio
- ✅ http://localhost:8000/docs - Documentación interactiva
- ✅ http://localhost:8000/api/v1/testimonios/ - Lista de testimonios
- ✅ http://localhost:8000/api/v1/estadisticas/ - Estadísticas

#### 4. Verificar logs del backend

Cuando ejecutes el backend, deberías ver en la consola:
```
==================================================
🚀 Iniciando Talleres API Backend
==================================================
📍 URL: http://localhost:8000
📚 Docs: http://localhost:8000/docs
==================================================
✓ Rutas de la API cargadas correctamente
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Si no ves estos mensajes, hay un error en el backend.

#### 5. Verificar dependencias de Python

```bash
cd backend
pip install -r requirements.txt
```

Las dependencias principales son:
- fastapi
- uvicorn
- python-dotenv
- pydantic

## ❌ Error: "pnpm no reconocido"

```bash
npm install -g pnpm
```

## ❌ Error: Frontend no carga

1. Verificar que estás en la carpeta correcta:
```bash
cd Talleres
pnpm dev
```

2. Si hay errores de dependencias:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## ❌ Error: CORS

Si ves errores de CORS en la consola del navegador, verifica que `backend/main.py` tenga:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🧪 Testing Manual de los Endpoints

### Usando el navegador:

1. Ve a http://localhost:8000/docs
2. Expande cualquier endpoint
3. Haz clic en "Try it out"
4. Haz clic en "Execute"

### Usando curl:

```bash
# Testimonios
curl http://localhost:8000/api/v1/testimonios/

# Estadísticas
curl http://localhost:8000/api/v1/estadisticas/

# Categorías
curl http://localhost:8000/api/v1/categorias/

# Talleres
curl http://localhost:8000/api/v1/talleres/
```

## 📞 Checklist de Debugging

- [ ] ¿Python está instalado? (`python --version`)
- [ ] ¿pnpm está instalado? (`pnpm --version`)
- [ ] ¿El backend está corriendo? (Ve a http://localhost:8000/health)
- [ ] ¿El frontend está corriendo? (Ve a http://localhost:5173)
- [ ] ¿Las dependencias están instaladas?
  - [ ] Backend: `pip list` muestra fastapi, uvicorn, etc.
  - [ ] Frontend: carpeta `Talleres/node_modules` existe
- [ ] ¿Los puertos están libres? (8000 para backend, 5173 para frontend)
- [ ] ¿Los logs muestran errores? Revisa la consola donde ejecutaste los servicios

## 🆘 Si nada funciona

1. Detén todos los procesos (Ctrl+C)
2. Elimina los entornos virtuales y dependencias:
   ```bash
   # Eliminar entorno virtual de Python
   rm -rf backend/venv
   
   # Eliminar node_modules
   rm -rf Talleres/node_modules
   rm -rf Talleres/pnpm-lock.yaml
   ```
3. Ejecuta el script de inicio de nuevo:
   ```bash
   start.bat  # Windows
   # o
   ./start.sh  # Linux/Mac
   ```

