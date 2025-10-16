import React, { useState } from 'react'
import './Aprender.css'
import { useTalleres } from '../hooks/useTalleres'

const Aprender: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOficio, setSelectedOficio] = useState('')
  const [selectedNivel, setSelectedNivel] = useState('')
  
  // Usar el hook para obtener datos del backend
  const { talleres: talleresData, loading, error } = useTalleres()

  const oficios = [
    'Carpintería', 'Costura', 'Cocina', 'Jardinería', 'Electricidad',
    'Plomería', 'Pintura', 'Reparación de electrodomésticos', 'Herrería',
    'Albañilería', 'Fontanería'
  ]

  const niveles = ['Principiante', 'Intermedio', 'Avanzado']

  // Mapear datos del backend al formato esperado por el frontend
  const talleres = talleresData.map(taller => ({
    id: taller.id,
    titulo: taller.nombre,
    instructor: taller.instructor,
    oficio: taller.categoria,
    precio: taller.precio,
    duracion: taller.duracion_horas,
    nivel: 'Principiante', // Por defecto, podríamos agregar este campo al backend
    descripcion: taller.descripcion,
    rating: 4.5, // Por defecto, podríamos agregar este campo al backend
    estudiantes: 0, // Por defecto, podríamos agregar este campo al backend
    fecha: 'Próximamente', // Por defecto, podríamos agregar este campo al backend
    ubicacion: 'Virtual' // Por defecto, podríamos agregar este campo al backend
  }))

  const filteredTalleres = talleres.filter(taller => {
    const matchesSearch = taller.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         taller.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOficio = !selectedOficio || taller.oficio === selectedOficio
    const matchesNivel = !selectedNivel || taller.nivel === selectedNivel
    
    return matchesSearch && matchesOficio && matchesNivel
  })

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="aprender">
        <div className="page-header">
          <h1>🎓 Aprende Nuevos Oficios</h1>
          <p>Cargando talleres...</p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando talleres disponibles...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si hay uno
  if (error) {
    return (
      <div className="aprender">
        <div className="page-header">
          <h1>🎓 Aprende Nuevos Oficios</h1>
          <p>Error al cargar los talleres</p>
        </div>
        <div className="error">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="aprender">
      <div className="page-header">
        <h1>🎓 Aprende Nuevos Oficios</h1>
        <p>Descubre talleres impartidos por tus vecinos y desarrolla nuevas habilidades</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar talleres o instructores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="filters">
          <select
            value={selectedOficio}
            onChange={(e) => setSelectedOficio(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los oficios</option>
            {oficios.map(oficio => (
              <option key={oficio} value={oficio}>{oficio}</option>
            ))}
          </select>

          <select
            value={selectedNivel}
            onChange={(e) => setSelectedNivel(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los niveles</option>
            {niveles.map(nivel => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="talleres-grid">
        {filteredTalleres.map(taller => (
          <div key={taller.id} className="taller-card">
            <div className="taller-header">
              <h3>{taller.titulo}</h3>
              <div className="taller-rating">
                <span>⭐ {taller.rating}</span>
                <span>({taller.estudiantes} estudiantes)</span>
              </div>
            </div>

            <div className="taller-info">
              <div className="taller-instructor">
                <span className="instructor-icon">👨‍🏫</span>
                <span>{taller.instructor}</span>
              </div>
              <div className="taller-ubicacion">
                <span className="ubicacion-icon">📍</span>
                <span>{taller.ubicacion}</span>
              </div>
            </div>

            <p className="taller-descripcion">{taller.descripcion}</p>

            <div className="taller-details">
              <div className="detail">
                <span className="detail-label">Oficio:</span>
                <span className="detail-value">{taller.oficio}</span>
              </div>
              <div className="detail">
                <span className="detail-label">Nivel:</span>
                <span className="detail-value">{taller.nivel}</span>
              </div>
              <div className="detail">
                <span className="detail-label">Duración:</span>
                <span className="detail-value">{taller.duracion}h</span>
              </div>
              <div className="detail">
                <span className="detail-label">Fecha:</span>
                <span className="detail-value">{taller.fecha}</span>
              </div>
            </div>

            <div className="taller-footer">
              <div className="taller-precio">
                <span className="precio-simbolo">$</span>
                <span className="precio-valor">{taller.precio}</span>
                <span className="precio-unidad">/sesión</span>
              </div>
              <button className="btn btn-primary">Inscribirse</button>
            </div>
          </div>
        ))}
      </div>

      {filteredTalleres.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron talleres</h3>
          <p>Intenta ajustar tus filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}

export default Aprender
