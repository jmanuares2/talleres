import React, { useState } from 'react'
import './Ensenar.css'
import { useTalleres } from '../hooks/useTalleres'
import { useCategorias } from '../hooks/useCategorias'

const Ensenar: React.FC = () => {
  const [showForm, setShowForm] = useState(true)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    oficio: '',
    precio: '',
    duracion: '',
    nivel: 'Principiante',
    modalidad: 'ambos' // 'enseñar', 'servicio', 'ambos'
  })
  
  // Usar el hook para crear talleres
  const { createTaller } = useTalleres()
  
  // Obtener categorías dinámicamente
  const { oficios } = useCategorias()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Crear el taller usando la API
      await createTaller({
        nombre: formData.titulo,
        descripcion: formData.descripcion,
        instructor: 'Usuario Actual', // En una app real, esto vendría del contexto de autenticación
        duracion_horas: parseInt(formData.duracion),
        precio: parseFloat(formData.precio),
        categoria: formData.oficio,
        nivel: formData.nivel,
        rating: 4.5,
        estudiantes: 0,
        fecha: 'Próximamente',
        ubicacion: 'Presencial'
      })
      
      alert('¡Taller creado exitosamente!')
      setShowForm(false)
      setFormData({
        titulo: '',
        descripcion: '',
        oficio: '',
        precio: '',
        duracion: '',
        nivel: 'Principiante',
        modalidad: 'ambos'
      })
    } catch (error) {
      console.error('Error al crear el taller:', error)
      alert('Error al crear el taller. Por favor, inténtalo de nuevo.')
    }
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
        <h1>👨‍🏫 Registra tu Oficio</h1>
        <p>Ofrece tus servicios como profesional o enseña tu oficio a otros vecinos</p>
      </div>

      <div className="content-layout">
        <div className="info-section">
          <h2>¿Por qué registrarte en Talleres de Barrio?</h2>
          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">💰</div>
              <div className="benefit-content">
                <h3>Gana dinero extra</h3>
                <p>Monetiza tus habilidades como profesional o instructor</p>
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
        </div>

        <div className="form-section">
          <div className="form-header">
            <h2>Registrar tu Oficio</h2>
          </div>

          <form onSubmit={handleSubmit} className="taller-form">
              <div className="form-group">
                <label htmlFor="modalidad">¿Cómo quieres ofrecer tu oficio?</label>
                <div className="modalidad-options">
                  <label className="modalidad-option">
                    <input
                      type="radio"
                      name="modalidad"
                      value="enseñar"
                      checked={formData.modalidad === 'enseñar'}
                      onChange={handleInputChange}
                    />
                    <div className="modalidad-card">
                      <div className="modalidad-icon">👨‍🏫</div>
                      <div className="modalidad-content">
                        <h4>Solo Enseñar</h4>
                        <p>Imparte talleres y cursos</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="modalidad-option">
                    <input
                      type="radio"
                      name="modalidad"
                      value="servicio"
                      checked={formData.modalidad === 'servicio'}
                      onChange={handleInputChange}
                    />
                    <div className="modalidad-card">
                      <div className="modalidad-icon">🔧</div>
                      <div className="modalidad-content">
                        <h4>Solo Servicio</h4>
                        <p>Brinda servicios profesionales</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="modalidad-option">
                    <input
                      type="radio"
                      name="modalidad"
                      value="ambos"
                      checked={formData.modalidad === 'ambos'}
                      onChange={handleInputChange}
                    />
                    <div className="modalidad-card">
                      <div className="modalidad-icon">🎯</div>
                      <div className="modalidad-content">
                        <h4>Ambos</h4>
                        <p>Enseña y brinda servicios</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="titulo">Título de tu oficio</label>
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
                  <label htmlFor="precio">Precio por hora</label>
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
                Registrar Oficio
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Ensenar
