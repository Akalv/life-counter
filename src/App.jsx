import { useState } from 'react'
import Dashboard from './components/Dashboard'
import AddRecord from './components/AddRecord'
import Timeline from './components/Timeline'
import Settings from './components/Settings'

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard')

  const showScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="container">
      {/* Navigation */}
        <nav className="nav">
          <h1>📝 Life Recorder! 📝</h1>
        </nav>

       {/* FAB */}
       <div className="fab" onClick={() => showScreen('add-record')}>✨</div>

       {/* Screens */}
       {currentScreen === 'dashboard' && <Dashboard />}
       {currentScreen === 'add-record' && <AddRecord onClose={() => showScreen('dashboard')} onSave={() => showScreen('dashboard')} />}
       {currentScreen === 'timeline' && <Timeline />}
       {currentScreen === 'settings' && <Settings />}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className={`nav-item ${currentScreen === 'dashboard' ? 'active' : ''}`} onClick={() => showScreen('dashboard')}>Home 🏠</div>
        <div className={`nav-item ${currentScreen === 'timeline' ? 'active' : ''}`} onClick={() => showScreen('timeline')}>Story 📖</div>
        <div className={`nav-item ${currentScreen === 'settings' ? 'active' : ''}`} onClick={() => showScreen('settings')}>Settings ⚙️</div>
      </nav>
    </div>
  )
}

export default App
