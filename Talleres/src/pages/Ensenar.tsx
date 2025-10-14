import React, { useState } from 'react'
import './Ensenar.css'

const Ensenar: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    oficio: '',
    precio: '',
    duracion: '',
    nivel: 'Principiante'
  })

  const oficios = [
    'Carpintería', 'Costura', 'Cocina', 'Jardinería', 'Electricidad',
    'Plomería', 'Pintura', 'Reparación de electrodomésticos', 'Carpintería',
    'Herrería', 'Albañilería', 'Fontanería', 'Otro'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se enviaría la información a un backend
    console.log('Taller creado:', formData)
    alert('¡Taller creado exitosamente!')
    setShowForm(false)
    setFormData({
      titulo: '',
      descripcion: '',
      oficio: '',
      precio: '',
      duracion: '',
      nivel: 'Principiante'
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="ensenar">
      <div className="page-header">
        <h1>👨‍🏫 Enseña tu Oficio</h1>
        <p>Comparte tu conocimiento y gana dinero enseñando lo que sabes hacer</p>
      </div>

      <div className="content-grid">
        <div className="info-section">
          <h2>¿Por qué enseñar en Talleres de Barrio?</h2>
          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">💰</div>
              <div className="benefit-content">
                <h3>Gana dinero extra</h3>
                <p>Monetiza tus habilidades y conocimientos</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🤝</div>
              <div className="benefit-content">
                <h3>Ayuda a tus vecinos</h3>
                <p>Contribuye al desarrollo de tu comunidad</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">⭐</div>
              <div className="benefit-content">
                <h3>Construye tu reputación</h3>
                <p>Establece tu nombre como experto en tu oficio</p>
              </div>
            </div>
          </div>

          <div className="popular-talleres">
            <h3>Talleres más populares</h3>
            <div className="talleres-list">
              <div className="taller-item">
                <span className="taller-icon">🔨</span>
                <span>Carpintería básica</span>
                <span className="taller-price">$50/sesión</span>
              </div>
              <div className="taller-item">
                <span className="taller-icon">✂️</span>
                <span>Costura y confección</span>
                <span className="taller-price">$40/sesión</span>
              </div>
              <div className="taller-item">
                <span className="taller-icon">🍳</span>
                <span>Cocina tradicional</span>
                <span className="taller-price">$60/sesión</span>
              </div>
              <div className="taller-item">
                <span className="taller-icon">🌱</span>
                <span>Jardinería urbana</span>
                <span className="taller-price">$35/sesión</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-header">
            <h2>Crear tu Taller</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : 'Crear Taller'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="taller-form">
              <div className="form-group">
                <label htmlFor="titulo">Título del Taller</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ej: Carpintería básica para principiantes"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="oficio">Oficio</label>
                <select
                  id="oficio"
                  name="oficio"
                  value={formData.oficio}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un oficio</option>
                  {oficios.map((oficio) => (
                    <option key={oficio} value={oficio}>{oficio}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe qué aprenderán los participantes..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="precio">Precio por sesión</label>
                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    placeholder="50"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duracion">Duración (horas)</label>
                  <input
                    type="number"
                    id="duracion"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                    placeholder="2"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nivel">Nivel requerido</label>
                <select
                  id="nivel"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Crear Taller
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Ensenar
