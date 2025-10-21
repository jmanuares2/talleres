from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Estadisticas(BaseModel):
    talleres_disponibles: int
    vecinos_conectados: int
    oficios_diferentes: int

@router.get("/", response_model=Estadisticas)
async def obtener_estadisticas():
    """Obtener estadísticas generales de la plataforma"""
    # En una aplicación real, estos datos vendrían de la base de datos
    # Por ahora, retornamos datos simulados basados en los datos existentes
    
    return Estadisticas(
        talleres_disponibles=4,  # Basado en los talleres que agregamos
        vecinos_conectados=500,  # Número simulado
        oficios_diferentes=8     # Basado en las categorías disponibles
    )
