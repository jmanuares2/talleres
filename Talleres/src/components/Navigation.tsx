import React from 'react'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'ensenar', label: 'Enseñar', icon: '👨‍🏫' },
    { id: 'aprender', label: 'Aprender', icon: '🎓' },
    { id: 'contratar', label: 'Contratar', icon: '💼' }
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation

