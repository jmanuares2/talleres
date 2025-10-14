import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Talleres de Barrio</h3>
          <p>Conectando vecinos para compartir conocimientos y servicios</p>
        </div>
        <div className="footer-section">
          <h4>Funcionalidades</h4>
          <ul>
            <li>Enseñar oficios</li>
            <li>Aprender nuevas habilidades</li>
            <li>Contratar servicios</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📧 info@talleresdebarrio.com</p>
          <p>📱 +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Talleres de Barrio. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer

