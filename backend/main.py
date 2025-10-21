from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys

# Cargar variables de entorno
load_dotenv()

# Crear la aplicación FastAPI
app = FastAPI(
    title="Talleres API",
    description="API para el sistema de talleres",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS para permitir requests desde el frontend
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

# Rutas básicas
@app.get("/")
async def root():
    return {"message": "¡Bienvenido a la API de Talleres!", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "talleres-api"}

@app.get("/api/health")
async def api_health_check():
    return {"status": "healthy", "service": "talleres-api", "api_version": "v1"}

# Importar rutas de la API
try:
    from api.v1.api import api_router
    app.include_router(api_router, prefix="/api/v1")
    print("✓ Rutas de la API cargadas correctamente")
except Exception as e:
    print(f"✗ Error al cargar las rutas de la API: {e}", file=sys.stderr)
    raise

if __name__ == "__main__":
    import uvicorn
    print("=" * 50)
    print("🚀 Iniciando Talleres API Backend")
    print("=" * 50)
    print(f"📍 URL: http://localhost:8000")
    print(f"📚 Docs: http://localhost:8000/docs")
    print("=" * 50)
    try:
        uvicorn.run(
            app, 
            host="0.0.0.0", 
            port=8000,
            log_level="info"
        )
    except Exception as e:
        print(f"✗ Error al iniciar el servidor: {e}", file=sys.stderr)
        sys.exit(1)
