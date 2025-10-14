import React from 'react'

interface HomeProps {
  onNavigate: (page: string) => void
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
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
              <span className="stat-number">150+</span>
              <span className="stat-label">Talleres disponibles</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Vecinos conectados</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
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
          <div className="testimonial">
            <p>"Aprendí carpintería con mi vecino Juan. Ahora puedo hacer mis propios muebles!"</p>
            <div className="testimonial-author">
              <strong>María González</strong>
              <span>Vecina del Barrio Norte</span>
            </div>
          </div>
          <div className="testimonial">
            <p>"Enseño costura y he ganado dinero extra mientras ayudo a otros a aprender."</p>
            <div className="testimonial-author">
              <strong>Carmen López</strong>
              <span>Profesora de Costura</span>
            </div>
          </div>
          <div className="testimonial">
            <p>"Contraté a un electricista del barrio. Excelente trabajo y precio justo."</p>
            <div className="testimonial-author">
              <strong>Roberto Silva</strong>
              <span>Vecino del Centro</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

