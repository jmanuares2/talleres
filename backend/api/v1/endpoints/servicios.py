from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

# Modelos Pydantic
class ServicioBase(BaseModel):
    nombre: str
    servicio: str
    especialidad: str
    precio: float
    rating: float = 4.5
    trabajos: int = 0
    ubicacion: str = "Barrio Centro"
    descripcion: str
    disponibilidad: str = "Disponible"
    telefono: str

class ServicioCreate(ServicioBase):
    pass

class Servicio(ServicioBase):
    id: int
    activo: bool = True

    class Config:
        from_attributes = True

# Datos de ejemplo de servicios disponibles
servicios_db = [
    {
        "id": 1,
        "nombre": "Juan Pérez",
        "servicio": "Carpintería",
        "especialidad": "Muebles personalizados",
        "precio": 80,
        "rating": 4.9,
        "trabajos": 45,
        "ubicacion": "Barrio Norte",
        "descripcion": "Especialista en muebles de madera personalizados. 10 años de experiencia.",
        "disponibilidad": "Disponible",
        "telefono": "+54 911 1234-5678",
        "activo": True
    },
    {
        "id": 2,
        "nombre": "María González",
        "servicio": "Costura",
        "especialidad": "Arreglos y confección",
        "precio": 25,
        "rating": 4.8,
        "trabajos": 32,
        "ubicacion": "Barrio Centro",
        "descripcion": "Arreglos de ropa, confección de cortinas y ropa personalizada.",
        "disponibilidad": "Disponible",
        "telefono": "+54 911 2345-6789",
        "activo": True
    },
    {
        "id": 3,
        "nombre": "Carlos López",
        "servicio": "Jardinería",
        "especialidad": "Diseño de jardines",
        "precio": 60,
        "rating": 4.7,
        "trabajos": 28,
        "ubicacion": "Barrio Sur",
        "descripcion": "Diseño y mantenimiento de jardines. Especialista en plantas nativas.",
        "disponibilidad": "Disponible",
        "telefono": "+54 911 3456-7890",
        "activo": True
    },
    {
        "id": 4,
        "nombre": "Roberto Silva",
        "servicio": "Electricidad",
        "especialidad": "Instalaciones domésticas",
        "precio": 100,
        "rating": 4.9,
        "trabajos": 67,
        "ubicacion": "Barrio Este",
        "descripcion": "Instalaciones eléctricas, reparaciones y mantenimiento. Certificado.",
        "disponibilidad": "Ocupado",
        "telefono": "+54 911 4567-8901",
        "activo": True
    },
    {
        "id": 5,
        "nombre": "Ana Martínez",
        "servicio": "Limpieza",
        "especialidad": "Limpieza profunda",
        "precio": 40,
        "rating": 4.6,
        "trabajos": 23,
        "ubicacion": "Barrio Oeste",
        "descripcion": "Servicio de limpieza profunda para hogares y oficinas.",
        "disponibilidad": "Disponible",
        "telefono": "+54 911 5678-9012",
        "activo": True
    },
    {
        "id": 6,
        "nombre": "Luis Rodríguez",
        "servicio": "Plomería",
        "especialidad": "Reparaciones urgentes",
        "precio": 70,
        "rating": 4.8,
        "trabajos": 41,
        "ubicacion": "Barrio Norte",
        "descripcion": "Reparaciones de plomería, instalaciones y mantenimiento preventivo.",
        "disponibilidad": "Disponible",
        "telefono": "+54 911 6789-0123",
        "activo": True
    }
]

@router.get("/", response_model=List[Servicio])
async def obtener_servicios():
    """Obtener todos los servicios"""
    return servicios_db

@router.get("/{servicio_id}", response_model=Servicio)
async def obtener_servicio(servicio_id: int):
    """Obtener un servicio específico"""
    for servicio in servicios_db:
        if servicio["id"] == servicio_id:
            return servicio
    raise HTTPException(status_code=404, detail="Servicio no encontrado")

@router.post("/", response_model=Servicio)
async def crear_servicio(servicio: ServicioCreate):
    """Crear un nuevo servicio"""
    nuevo_id = max([s["id"] for s in servicios_db]) + 1 if servicios_db else 1
    nuevo_servicio = {
        "id": nuevo_id,
        **servicio.dict(),
        "activo": True
    }
    servicios_db.append(nuevo_servicio)
    return nuevo_servicio

@router.put("/{servicio_id}", response_model=Servicio)
async def actualizar_servicio(servicio_id: int, servicio: ServicioCreate):
    """Actualizar un servicio existente"""
    for i, s in enumerate(servicios_db):
        if s["id"] == servicio_id:
            servicios_db[i] = {**s, **servicio.dict()}
            return servicios_db[i]
    raise HTTPException(status_code=404, detail="Servicio no encontrado")

@router.delete("/{servicio_id}")
async def eliminar_servicio(servicio_id: int):
    """Eliminar un servicio (marcar como inactivo)"""
    for i, s in enumerate(servicios_db):
        if s["id"] == servicio_id:
            servicios_db[i]["activo"] = False
            return {"message": "Servicio eliminado correctamente"}
    raise HTTPException(status_code=404, detail="Servicio no encontrado")

