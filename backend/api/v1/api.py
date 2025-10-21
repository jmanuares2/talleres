from fastapi import APIRouter
from api.v1.endpoints import talleres, usuarios, servicios, estadisticas, categorias, testimonios

api_router = APIRouter()

# Incluir todos los endpoints
api_router.include_router(talleres.router, prefix="/talleres", tags=["talleres"])
api_router.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
api_router.include_router(servicios.router, prefix="/servicios", tags=["servicios"])
api_router.include_router(estadisticas.router, prefix="/estadisticas", tags=["estadisticas"])
api_router.include_router(categorias.router, prefix="/categorias", tags=["categorias"])
api_router.include_router(testimonios.router, prefix="/testimonios", tags=["testimonios"])
