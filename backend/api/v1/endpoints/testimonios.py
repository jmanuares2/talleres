from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Testimonio(BaseModel):
    id: int
    texto: str
    autor: str
    ubicacion: str

@router.get("/", response_model=List[Testimonio])
async def obtener_testimonios():
    """Obtener testimonios de usuarios"""
    return [
        {
            "id": 1,
            "texto": "Aprendí carpintería con mi vecino Juan. Ahora puedo hacer mis propios muebles!",
            "autor": "María González",
            "ubicacion": "Vecina del Barrio Norte"
        },
        {
            "id": 2,
            "texto": "Enseño costura y he ganado dinero extra mientras ayudo a otros a aprender.",
            "autor": "Carmen López",
            "ubicacion": "Profesora de Costura"
        },
        {
            "id": 3,
            "texto": "Contraté a un electricista del barrio. Excelente trabajo y precio justo.",
            "autor": "Roberto Silva",
            "ubicacion": "Vecino del Centro"
        },
        {
            "id": 4,
            "texto": "Los talleres de cocina me cambiaron la vida. Ahora cocino para mi familia con confianza.",
            "autor": "Ana Martínez",
            "ubicacion": "Vecina del Barrio Sur"
        }
    ]


