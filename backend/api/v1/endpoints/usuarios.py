from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

# Modelos Pydantic
class UsuarioBase(BaseModel):
    nombre: str
    email: str
    telefono: str
    tipo: str  # "estudiante" o "instructor"

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int
    activo: bool = True

    class Config:
        from_attributes = True

# Datos de ejemplo
usuarios_db = [
    {
        "id": 1,
        "nombre": "Ana López",
        "email": "ana@email.com",
        "telefono": "123456789",
        "tipo": "estudiante",
        "activo": True
    },
    {
        "id": 2,
        "nombre": "Carlos Ruiz",
        "email": "carlos@email.com",
        "telefono": "987654321",
        "tipo": "instructor",
        "activo": True
    }
]

@router.get("/", response_model=List[Usuario])
async def obtener_usuarios():
    """Obtener todos los usuarios"""
    return usuarios_db

@router.get("/{usuario_id}", response_model=Usuario)
async def obtener_usuario(usuario_id: int):
    """Obtener un usuario específico"""
    for usuario in usuarios_db:
        if usuario["id"] == usuario_id:
            return usuario
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

@router.post("/", response_model=Usuario)
async def crear_usuario(usuario: UsuarioCreate):
    """Crear un nuevo usuario"""
    nuevo_id = max([u["id"] for u in usuarios_db]) + 1 if usuarios_db else 1
    nuevo_usuario = {
        "id": nuevo_id,
        **usuario.dict(),
        "activo": True
    }
    usuarios_db.append(nuevo_usuario)
    return nuevo_usuario

@router.put("/{usuario_id}", response_model=Usuario)
async def actualizar_usuario(usuario_id: int, usuario: UsuarioCreate):
    """Actualizar un usuario existente"""
    for i, u in enumerate(usuarios_db):
        if u["id"] == usuario_id:
            usuarios_db[i] = {**u, **usuario.dict()}
            return usuarios_db[i]
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

@router.delete("/{usuario_id}")
async def eliminar_usuario(usuario_id: int):
    """Eliminar un usuario (marcar como inactivo)"""
    for i, u in enumerate(usuarios_db):
        if u["id"] == usuario_id:
            usuarios_db[i]["activo"] = False
            return {"message": "Usuario eliminado correctamente"}
    raise HTTPException(status_code=404, detail="Usuario no encontrado")
