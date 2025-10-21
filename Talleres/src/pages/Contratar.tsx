import React, { useState } from 'react'
import './Contratar.css'
import { useServicios } from '../hooks/useServicios'
import { useCategorias } from '../hooks/useCategorias'

const Contratar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedServicio, setSelectedServicio] = useState('')
  const [selectedUbicacion, setSelectedUbicacion] = useState('')
  
  // Usar el hook para obtener datos del backend
  const { servicios: serviciosData, loading, error } = useServicios()
  
  // Obtener categorías dinámicamente
  const { oficios: servicios, ubicaciones } = useCategorias()

  // Usar datos del backend
  const serviciosDisponibles = serviciosData

  const filteredServicios = serviciosDisponibles.filter(servicio => {
    const matchesSearch = servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servicio.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesServicio = !selectedServicio || servicio.servicio === selectedServicio
    const matchesUbicacion = !selectedUbicacion || servicio.ubicacion === selectedUbicacion
    
    return matchesSearch && matchesServicio && matchesUbicacion
  })

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="contratar">
        <div className="page-header">
          <h1>💼 Contratar Servicios</h1>
          <p>Cargando servicios...</p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando servicios disponibles...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si hay uno
  if (error) {
    return (
      <div className="contratar">
        <div className="page-header">
          <h1>💼 Contratar Servicios</h1>
          <p>Error al cargar los servicios</p>
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
    <div className="contratar">
      <div className="page-header">
        <h1>💼 Contratar Servicios</h1>
        <p>Encuentra profesionales en tu barrio para resolver tus necesidades</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar servicios o profesionales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="filters">
          <select
            value={selectedServicio}
            onChange={(e) => setSelectedServicio(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los servicios</option>
            {servicios.map(servicio => (
              <option key={servicio} value={servicio}>{servicio}</option>
            ))}
          </select>

          <select
            value={selectedUbicacion}
            onChange={(e) => setSelectedUbicacion(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas las ubicaciones</option>
            {ubicaciones.map(ubicacion => (
              <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="servicios-grid">
        {filteredServicios.map(servicio => (
          <div 
            key={servicio.id} 
            className="servicio-card"
            onClick={() => {
              if (servicio.disponibilidad !== 'Ocupado') {
                alert(`Contactando a ${servicio.nombre}...`);
              }
            }}
            style={{ cursor: servicio.disponibilidad === 'Ocupado' ? 'default' : 'pointer' }}
          >
            <div className="servicio-header">
              <div className="servicio-info">
                <h3>{servicio.nombre}</h3>
                <p className="servicio-especialidad">{servicio.especialidad}</p>
              </div>
              <div className="servicio-status">
                <span className={`status-badge ${servicio.disponibilidad.toLowerCase()}`}>
                  {servicio.disponibilidad}
                </span>
              </div>
            </div>

            <div className="servicio-details">
              <div className="servicio-rating">
                <span>⭐ {servicio.rating}</span>
                <span>({servicio.trabajos} trabajos)</span>
              </div>
              <div className="servicio-ubicacion">
                <span className="ubicacion-icon">📍</span>
                <span>{servicio.ubicacion}</span>
              </div>
            </div>

            <p className="servicio-descripcion">{servicio.descripcion}</p>

            <div className="servicio-footer">
              <div className="servicio-precio">
                <span className="precio-simbolo">$</span>
                <span className="precio-valor">{servicio.precio}</span>
                <span className="precio-unidad">/hora</span>
              </div>
              <div className="servicio-actions">
                <button className="btn btn-outline">
                  📞 {servicio.telefono}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServicios.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron servicios</h3>
          <p>Intenta ajustar tus filtros de búsqueda</p>
        </div>
      )}

      <div className="info-section">
        <h2>¿Cómo funciona?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Busca el servicio</h3>
              <p>Encuentra el profesional que necesitas en tu barrio</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Contacta directamente</h3>
              <p>Llama o envía mensaje al profesional</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Acuerda el trabajo</h3>
              <p>Negocia precio, fecha y detalles del servicio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contratar
