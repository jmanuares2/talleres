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
    nivel: str = "Principiante"
    rating: float = 4.5
    estudiantes: int = 0
    fecha: str = "Próximamente"
    ubicacion: str = "Virtual"

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
        "nivel": "Principiante",
        "rating": 4.5,
        "estudiantes": 12,
        "fecha": "2024-02-15",
        "ubicacion": "Virtual",
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
        "nivel": "Principiante",
        "rating": 4.3,
        "estudiantes": 8,
        "fecha": "2024-02-20",
        "ubicacion": "Virtual",
        "activo": True
    },
    {
        "id": 3,
        "nombre": "Carpintería Básica",
        "descripcion": "Aprende a trabajar la madera y crear muebles simples",
        "instructor": "Carlos López",
        "duracion_horas": 12,
        "precio": 80.0,
        "categoria": "Carpintería",
        "nivel": "Principiante",
        "rating": 4.7,
        "estudiantes": 15,
        "fecha": "2024-02-25",
        "ubicacion": "Presencial",
        "activo": True
    },
    {
        "id": 4,
        "nombre": "Costura y Confección",
        "descripcion": "Domina las técnicas básicas de costura y confección",
        "instructor": "Ana Martínez",
        "duracion_horas": 10,
        "precio": 60.0,
        "categoria": "Costura",
        "nivel": "Principiante",
        "rating": 4.6,
        "estudiantes": 20,
        "fecha": "2024-03-01",
        "ubicacion": "Presencial",
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
