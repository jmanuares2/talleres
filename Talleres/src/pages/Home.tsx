import React from 'react'
import { useEstadisticas } from '../hooks/useEstadisticas'
import { useTestimonios } from '../hooks/useTestimonios'

interface HomeProps {
  onNavigate: (page: string) => void
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // Usar el hook para obtener estadísticas dinámicas
  const { estadisticas, loading } = useEstadisticas()
  
  // Usar el hook para obtener testimonios dinámicos
  const { testimonios } = useTestimonios()
  
  const features = [
    {
      id: 'ensenar',
      title: 'Registrar Oficio',
      description: 'Ofrece tus servicios como profesional o enseña tu oficio a otros vecinos',
      icon: '👨‍🏫',
      color: '#4CAF50'
    },
    {
      id: 'aprender',
      title: 'Aprender',
      description: 'Descubre nuevos oficios y habilidades de tus vecinos',
      icon: '🎓',
      color: '#2196F3'
    },
    {
      id: 'contratar',
      title: 'Contratar',
      description: 'Encuentra servicios profesionales en tu barrio',
      icon: '💼',
      color: '#FF9800'
    }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>¡Bienvenido a Talleres de Barrio!</h1>
          <p className="hero-subtitle">
            La plataforma que conecta vecinos para compartir conocimientos, 
            aprender nuevos oficios y contratar servicios profesionales.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">
                {loading ? '...' : `${estadisticas.talleres_disponibles}+`}
              </span>
              <span className="stat-label">Talleres disponibles</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {loading ? '...' : `${estadisticas.vecinos_conectados}+`}
              </span>
              <span className="stat-label">Vecinos conectados</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {loading ? '...' : `${estadisticas.oficios_diferentes}+`}
              </span>
              <span className="stat-label">Oficios diferentes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>¿Qué puedes hacer aquí?</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="feature-card"
              onClick={() => onNavigate(feature.id)}
              style={{ borderTopColor: feature.color }}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button className="btn btn-primary">Explorar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>Lo que dicen nuestros vecinos</h2>
        <div className="testimonials-grid">
          {testimonios.slice(0, 3).map((testimonio) => (
            <div key={testimonio.id} className="testimonial">
              <p>"{testimonio.texto}"</p>
              <div className="testimonial-author">
                <strong>{testimonio.autor}</strong>
                <span>{testimonio.ubicacion}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

