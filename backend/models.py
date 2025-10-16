from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.sql import func
from database import Base

class Taller(Base):
    __tablename__ = "talleres"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)
    instructor = Column(String(100), nullable=False)
    duracion_horas = Column(Integer, nullable=False)
    precio = Column(Float, nullable=False)
    categoria = Column(String(50), nullable=False)
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    telefono = Column(String(20))
    tipo = Column(String(20), nullable=False)  # "estudiante" o "instructor"
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Inscripcion(Base):
    __tablename__ = "inscripciones"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, nullable=False)
    taller_id = Column(Integer, nullable=False)
    fecha_inscripcion = Column(DateTime(timezone=True), server_default=func.now())
    estado = Column(String(20), default="activa")  # "activa", "completada", "cancelada"
    calificacion = Column(Float, nullable=True)
    comentarios = Column(Text, nullable=True)
