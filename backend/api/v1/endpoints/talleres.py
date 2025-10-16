from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

# Modelos Pydantic
class TallerBase(BaseModel):
    nombre: str
    descripcion: str
    instructor: str
    duracion_horas: int
    precio: float
    categoria: str

class TallerCreate(TallerBase):
    pass

class Taller(TallerBase):
    id: int
    activo: bool = True

    class Config:
        from_attributes = True

# Datos de ejemplo (en producción vendría de la base de datos)
talleres_db = [
    {
        "id": 1,
        "nombre": "Taller de React",
        "descripcion": "Aprende React desde cero",
        "instructor": "Juan Pérez",
        "duracion_horas": 20,
        "precio": 150.0,
        "categoria": "Programación",
        "activo": True
    },
    {
        "id": 2,
        "nombre": "Taller de Python",
        "descripcion": "Python para principiantes",
        "instructor": "María García",
        "duracion_horas": 15,
        "precio": 120.0,
        "categoria": "Programación",
        "activo": True
    }
]

@router.get("/", response_model=List[Taller])
async def obtener_talleres():
    """Obtener todos los talleres"""
    return talleres_db

@router.get("/{taller_id}", response_model=Taller)
async def obtener_taller(taller_id: int):
    """Obtener un taller específico"""
    for taller in talleres_db:
        if taller["id"] == taller_id:
            return taller
    raise HTTPException(status_code=404, detail="Taller no encontrado")

@router.post("/", response_model=Taller)
async def crear_taller(taller: TallerCreate):
    """Crear un nuevo taller"""
    nuevo_id = max([t["id"] for t in talleres_db]) + 1 if talleres_db else 1
    nuevo_taller = {
        "id": nuevo_id,
        **taller.dict(),
        "activo": True
    }
    talleres_db.append(nuevo_taller)
    return nuevo_taller

@router.put("/{taller_id}", response_model=Taller)
async def actualizar_taller(taller_id: int, taller: TallerCreate):
    """Actualizar un taller existente"""
    for i, t in enumerate(talleres_db):
        if t["id"] == taller_id:
            talleres_db[i] = {**t, **taller.dict()}
            return talleres_db[i]
    raise HTTPException(status_code=404, detail="Taller no encontrado")

@router.delete("/{taller_id}")
async def eliminar_taller(taller_id: int):
    """Eliminar un taller (marcar como inactivo)"""
    for i, t in enumerate(talleres_db):
        if t["id"] == taller_id:
            talleres_db[i]["activo"] = False
            return {"message": "Taller eliminado correctamente"}
    raise HTTPException(status_code=404, detail="Taller no encontrado")
