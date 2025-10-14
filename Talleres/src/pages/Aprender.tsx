import React, { useState } from 'react'
import './Aprender.css'

const Aprender: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOficio, setSelectedOficio] = useState('')
  const [selectedNivel, setSelectedNivel] = useState('')

  const oficios = [
    'Carpintería', 'Costura', 'Cocina', 'Jardinería', 'Electricidad',
    'Plomería', 'Pintura', 'Reparación de electrodomésticos', 'Herrería',
    'Albañilería', 'Fontanería'
  ]

  const niveles = ['Principiante', 'Intermedio', 'Avanzado']

  // Datos de ejemplo de talleres disponibles
  const talleres = [
    {
      id: 1,
      titulo: 'Carpintería Básica',
      instructor: 'Juan Pérez',
      oficio: 'Carpintería',
      precio: 50,
      duracion: 3,
      nivel: 'Principiante',
      descripcion: 'Aprende las técnicas básicas de carpintería y construye tu primer proyecto.',
      rating: 4.8,
      estudiantes: 12,
      fecha: '15 Oct 2024',
      ubicacion: 'Barrio Norte'
    },
    {
      id: 2,
      titulo: 'Costura y Confección',
      instructor: 'María González',
      oficio: 'Costura',
      precio: 40,
      duracion: 2,
      nivel: 'Principiante',
      descripcion: 'Domina el uso de la máquina de coser y crea tus propias prendas.',
      rating: 4.9,
      estudiantes: 8,
      fecha: '20 Oct 2024',
      ubicacion: 'Barrio Centro'
    },
    {
      id: 3,
      titulo: 'Jardinería Urbana',
      instructor: 'Carlos López',
      oficio: 'Jardinería',
      precio: 35,
      duracion: 2,
      nivel: 'Principiante',
      descripcion: 'Aprende a crear y mantener un jardín en espacios pequeños.',
      rating: 4.7,
      estudiantes: 15,
      fecha: '18 Oct 2024',
      ubicacion: 'Barrio Sur'
    },
    {
      id: 4,
      titulo: 'Reparación de Electrodomésticos',
      instructor: 'Roberto Silva',
      oficio: 'Reparación de electrodomésticos',
      precio: 60,
      duracion: 4,
      nivel: 'Intermedio',
      descripcion: 'Aprende a diagnosticar y reparar electrodomésticos comunes.',
      rating: 4.6,
      estudiantes: 6,
      fecha: '22 Oct 2024',
      ubicacion: 'Barrio Este'
    }
  ]

  const filteredTalleres = talleres.filter(taller => {
    const matchesSearch = taller.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         taller.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOficio = !selectedOficio || taller.oficio === selectedOficio
    const matchesNivel = !selectedNivel || taller.nivel === selectedNivel
    
    return matchesSearch && matchesOficio && matchesNivel
  })

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
