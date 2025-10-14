import React, { useState } from 'react'
import './Contratar.css'

const Contratar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedServicio, setSelectedServicio] = useState('')
  const [selectedUbicacion, setSelectedUbicacion] = useState('')

  const servicios = [
    'Carpintería', 'Costura', 'Cocina', 'Jardinería', 'Electricidad',
    'Plomería', 'Pintura', 'Reparación de electrodomésticos', 'Herrería',
    'Albañilería', 'Fontanería', 'Limpieza', 'Cuidado de mascotas'
  ]

  const ubicaciones = [
    'Barrio Norte', 'Barrio Sur', 'Barrio Este', 'Barrio Oeste', 'Barrio Centro'
  ]

  // Datos de ejemplo de servicios disponibles
  const serviciosDisponibles = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      servicio: 'Carpintería',
      especialidad: 'Muebles personalizados',
      precio: 80,
      rating: 4.9,
      trabajos: 45,
      ubicacion: 'Barrio Norte',
      descripcion: 'Especialista en muebles de madera personalizados. 10 años de experiencia.',
      disponibilidad: 'Disponible',
      telefono: '+1 (555) 123-4567'
    },
    {
      id: 2,
      nombre: 'María González',
      servicio: 'Costura',
      especialidad: 'Arreglos y confección',
      precio: 25,
      rating: 4.8,
      trabajos: 32,
      ubicacion: 'Barrio Centro',
      descripcion: 'Arreglos de ropa, confección de cortinas y ropa personalizada.',
      disponibilidad: 'Disponible',
      telefono: '+1 (555) 234-5678'
    },
    {
      id: 3,
      nombre: 'Carlos López',
      servicio: 'Jardinería',
      especialidad: 'Diseño de jardines',
      precio: 60,
      rating: 4.7,
      trabajos: 28,
      ubicacion: 'Barrio Sur',
      descripcion: 'Diseño y mantenimiento de jardines. Especialista en plantas nativas.',
      disponibilidad: 'Disponible',
      telefono: '+1 (555) 345-6789'
    },
    {
      id: 4,
      nombre: 'Roberto Silva',
      servicio: 'Electricidad',
      especialidad: 'Instalaciones domésticas',
      precio: 100,
      rating: 4.9,
      trabajos: 67,
      ubicacion: 'Barrio Este',
      descripcion: 'Instalaciones eléctricas, reparaciones y mantenimiento. Certificado.',
      disponibilidad: 'Ocupado',
      telefono: '+1 (555) 456-7890'
    },
    {
      id: 5,
      nombre: 'Ana Martínez',
      servicio: 'Limpieza',
      especialidad: 'Limpieza profunda',
      precio: 40,
      rating: 4.6,
      trabajos: 23,
      ubicacion: 'Barrio Oeste',
      descripcion: 'Servicio de limpieza profunda para hogares y oficinas.',
      disponibilidad: 'Disponible',
      telefono: '+1 (555) 567-8901'
    },
    {
      id: 6,
      nombre: 'Luis Rodríguez',
      servicio: 'Plomería',
      especialidad: 'Reparaciones urgentes',
      precio: 70,
      rating: 4.8,
      trabajos: 41,
      ubicacion: 'Barrio Norte',
      descripcion: 'Reparaciones de plomería, instalaciones y mantenimiento preventivo.',
      disponibilidad: 'Disponible',
      telefono: '+1 (555) 678-9012'
    }
  ]

  const filteredServicios = serviciosDisponibles.filter(servicio => {
    const matchesSearch = servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servicio.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesServicio = !selectedServicio || servicio.servicio === selectedServicio
    const matchesUbicacion = !selectedUbicacion || servicio.ubicacion === selectedUbicacion
    
    return matchesSearch && matchesServicio && matchesUbicacion
  })

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
          <div key={servicio.id} className="servicio-card">
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
                <button 
                  className="btn btn-primary"
                  disabled={servicio.disponibilidad === 'Ocupado'}
                >
                  {servicio.disponibilidad === 'Ocupado' ? 'No disponible' : 'Contratar'}
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
