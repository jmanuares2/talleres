import { useState } from 'react'
import './App.css'

// Componentes principales
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Ensenar from './pages/Ensenar'
import Aprender from './pages/Aprender'
import Contratar from './pages/Contratar'
import Footer from './components/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'ensenar':
        return <Ensenar />
      case 'aprender':
        return <Aprender />
      case 'contratar':
        return <Contratar />
      default:
        return <Home onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      <Header />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
