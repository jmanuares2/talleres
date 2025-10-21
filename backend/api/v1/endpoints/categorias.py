from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Categorias(BaseModel):
    oficios: List[str]
    ubicaciones: List[str]
    niveles: List[str]

@router.get("/oficios", response_model=List[str])
async def obtener_oficios():
    """Obtener lista de oficios disponibles"""
    return [
        'Carpintería', 'Costura', 'Cocina', 'Jardinería', 'Electricidad',
        'Plomería', 'Pintura', 'Reparación de electrodomésticos', 'Herrería',
        'Albañilería', 'Fontanería', 'Limpieza', 'Cuidado de mascotas',
        'Programación', 'Diseño', 'Mecánica', 'Construcción'
    ]

@router.get("/ubicaciones", response_model=List[str])
async def obtener_ubicaciones():
    """Obtener lista de ubicaciones disponibles"""
    return [
        'Barrio Norte', 'Barrio Sur', 'Barrio Este', 'Barrio Oeste', 
        'Barrio Centro', 'Virtual', 'Presencial'
    ]

@router.get("/niveles", response_model=List[str])
async def obtener_niveles():
    """Obtener lista de niveles disponibles"""
    return ['Principiante', 'Intermedio', 'Avanzado']

@router.get("/", response_model=Categorias)
async def obtener_todas_categorias():
    """Obtener todas las categorías en un solo endpoint"""
    return Categorias(
        oficios=await obtener_oficios(),
        ubicaciones=await obtener_ubicaciones(),
        niveles=await obtener_niveles()
    )


