import { useRecords } from '../hooks/useRecords'

export default function Dashboard() {
  const { records, stats, updateCount, getDailyStats } = useRecords()
  const dailyStats = getDailyStats()

  const handleIncrement = (recordId) => {
    updateCount(recordId, 1)
    showParticleEffect()
  }

  const showParticleEffect = () => {
    const particle = document.createElement('div')
    particle.textContent = '✨'
    particle.style.position = 'fixed'
    particle.style.left = '50%'
    particle.style.top = '50%'
    particle.style.fontSize = '30px'
    particle.style.pointerEvents = 'none'
    particle.style.zIndex = '9999'
    particle.style.transform = 'translate(-50%, -50%)'
    document.body.appendChild(particle)

    const animation = particle.animate([
      { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out'
    })

    animation.onfinish = () => particle.remove()
  }

  return (
    <div id="dashboard" className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.happyDays}</div>
          <div className="stat-label">Happy Days</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{dailyStats.achievements}</div>
          <div className="stat-label">Achievements</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{dailyStats.smiles}</div>
          <div className="stat-label">Smiles</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{dailyStats.funLevel}%</div>
          <div className="stat-label">Fun Level</div>
        </div>
      </div>

      <div className="recent-events">
        <h2 className="section-title">My Life Records! 🌟</h2>
        <div id="records-list">
          {records.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
              <p>No records yet! Click the ✨ button to create your first life record.</p>
            </div>
          ) : (
            records.map(record => {
              const today = new Date().toISOString().split('T')[0]
              const todayCurrent = record.dailyProgress[today]?.current || 0
              return (
                <div key={record.id} className="record-item">
                  <div className="record-info">
                    <div className="record-title">{record.title}</div>
                    <div className="record-count">{todayCurrent}/{record.target}</div>
                  </div>
                  <div className="counter-controls">
                    <button className="counter-btn" onClick={() => updateCount(record.id, -1)}>➖</button>
                    <button className="counter-btn" onClick={() => handleIncrement(record.id)}>➕</button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}