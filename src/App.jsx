import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import AddRecord from './components/AddRecord'
import Timeline from './components/Timeline'
import Settings from './components/Settings'

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard')
  const [cleanupMessage, setCleanupMessage] = useState('')

  useEffect(() => {
    // 检查是否需要清理重复ID
    const params = new URLSearchParams(window.location.search)
    if (params.get('clear-duplicates') === 'true') {
      try {
        const data = JSON.parse(localStorage.getItem('life_records_data') || '{"records":[]}')
        const seenIds = new Set()
        const uniqueRecords = []
        let removedCount = 0

        data.records.forEach(record => {
          if (!seenIds.has(record.id)) {
            seenIds.add(record.id)
            uniqueRecords.push(record)
          } else {
            removedCount++
          }
        })

        if (removedCount > 0) {
          data.records = uniqueRecords
          localStorage.setItem('life_records_data', JSON.stringify(data))
          setCleanupMessage(`✅ 已清理 ${removedCount} 条重复记录！保留 ${uniqueRecords.length} 条记录。`)
        } else {
          setCleanupMessage('✅ 没有发现重复记录，数据正常。')
        }

        // 清除URL参数
        window.history.replaceState({}, '', window.location.pathname)
      } catch (e) {
        setCleanupMessage('❌ 清理失败：' + e.message)
      }
    }
  }, [])

  const showScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="container">
      {/* 清理完成提示 */}
      {cleanupMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: cleanupMessage.includes('✅') ? '#4CAF50' : '#f44336',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          zIndex: 9999,
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          {cleanupMessage}
        </div>
      )}

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
