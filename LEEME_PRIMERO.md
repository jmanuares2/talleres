# 🚀 LÉEME PRIMERO - Proyecto Talleres

## ⚡ Inicio Rápido (3 pasos)

### Paso 1: Verificar Requisitos
```bash
verificar.bat
```
Este script te dirá si tienes todo lo necesario instalado.

### Paso 2: Iniciar el Proyecto
```bash
start.bat
```
Este script iniciará automáticamente el backend y el frontend.

### Paso 3: Abrir en el Navegador
- **Frontend**: http://localhost:5173
- **Backend Docs**: http://localhost:8000/docs

---

## 🔧 ¿El backend no carga las reseñas?

### Problema Común: ERR_CONNECTION_REFUSED

**Solución:**

1. **Verifica que el backend esté corriendo:**
   ```bash
   start-backend-only.bat
   ```

2. **Prueba el backend:**
   ```bash
   test-backend.bat
   ```

3. **Si funciona, inicia todo junto:**
   ```bash
   start.bat
   ```

---

## 📂 Scripts Disponibles

### `start.bat` ⭐
**Uso:** Inicia el proyecto completo (backend + frontend)
```bash
start.bat
```

### `verificar.bat` 🔍
**Uso:** Verifica que tienes todo instalado
```bash
verificar.bat
```

### `start-backend-only.bat` 🔧
**Uso:** Solo inicia el backend (útil para debugging)
```bash
start-backend-only.bat
```

### `test-backend.bat` 🧪
**Uso:** Prueba todos los endpoints del backend
```bash
test-backend.bat
```

---

## 📊 Endpoints del Backend

Una vez que el backend esté corriendo, puedes acceder a:

### Principales
- 🏠 **Raíz**: http://localhost:8000
- ❤️ **Health**: http://localhost:8000/health
- 📚 **Docs**: http://localhost:8000/docs

### API v1 (datos)
- 💬 **Testimonios**: http://localhost:8000/api/v1/testimonios/
- 📈 **Estadísticas**: http://localhost:8000/api/v1/estadisticas/
- 📁 **Categorías**: http://localhost:8000/api/v1/categorias/
- 🎓 **Talleres**: http://localhost:8000/api/v1/talleres/
- ⚙️ **Servicios**: http://localhost:8000/api/v1/servicios/
- 👥 **Usuarios**: http://localhost:8000/api/v1/usuarios/

---

## ❌ Solución de Problemas

### El backend no inicia
1. Ejecuta `verificar.bat` para ver qué falta
2. Asegúrate de tener Python instalado
3. Revisa que el puerto 8000 esté libre

### El frontend no carga datos
1. **Verifica que el backend esté corriendo** (abre http://localhost:8000/health)
2. Si no responde, ejecuta `start-backend-only.bat`
3. Luego ejecuta `test-backend.bat` para probar los endpoints

### Error: "pnpm no reconocido"
```bash
npm install -g pnpm
```

### Error: "python no reconocido"
- Descarga e instala Python desde https://www.python.org/
- Durante la instalación, marca "Add Python to PATH"

---

## 📖 Documentación Adicional

- **`SOLUCION_ERRORES.md`** - Guía completa de solución de errores
- **`README_INICIO.md`** - Guía detallada de inicio
- **`backend/README.md`** - Documentación del backend
- **`Talleres/README.md`** - Documentación del frontend

---

## 🆘 Si nada funciona

1. **Detén todo** (Ctrl+C en las terminales)
2. **Limpia todo:**
   ```bash
   rmdir /s /q backend\venv
   rmdir /s /q Talleres\node_modules
   del Talleres\pnpm-lock.yaml
   ```
3. **Ejecuta de nuevo:**
   ```bash
   start.bat
   ```

---

## ✅ Checklist de Funcionamiento

- [ ] Python instalado (`python --version`)
- [ ] pnpm instalado (`pnpm --version`)
- [ ] Backend corriendo (http://localhost:8000/health responde)
- [ ] Frontend corriendo (http://localhost:5173 carga)
- [ ] Los datos se muestran en el frontend (testimonios, estadísticas, etc.)

---

## 💡 Consejos

1. **Siempre verifica primero:** Usa `verificar.bat` antes de empezar
2. **Backend primero:** Si hay problemas, prueba solo el backend con `start-backend-only.bat`
3. **Revisa los logs:** La consola te mostrará los errores específicos
4. **Usa las docs:** http://localhost:8000/docs es muy útil para probar endpoints

---

## 📞 Estructura del Proyecto

```
talleres/
├── backend/                 # API FastAPI
│   ├── api/v1/endpoints/   # Endpoints de la API
│   ├── main.py             # Punto de entrada
│   └── requirements.txt    # Dependencias Python
├── Talleres/               # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas de la app
│   │   ├── hooks/         # Custom hooks
│   │   └── services/      # Servicios API
│   └── package.json       # Dependencias Node
├── start.bat              # ⭐ Script principal
├── verificar.bat          # 🔍 Verificación del sistema
├── start-backend-only.bat # 🔧 Solo backend
└── test-backend.bat       # 🧪 Testing del backend
```

---

**¿Listo para empezar?** Ejecuta `start.bat` y disfruta! 🎉

