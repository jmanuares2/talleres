from fastapi import APIRouter
from api.v1.endpoints import talleres, usuarios

api_router = APIRouter()

# Incluir todos los endpoints
api_router.include_router(talleres.router, prefix="/talleres", tags=["talleres"])
api_router.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
