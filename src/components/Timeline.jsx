import { useRecords } from '../hooks/useRecords'

export default function Timeline() {
  const { achievements } = useRecords()

  return (
    <div id="timeline" className="timeline-screen">
      <h2 className="section-title">Life Achievement Story! 📚</h2>
      {achievements.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
          <p>Complete some records to see your achievements here!</p>
        </div>
      ) : (
        achievements.map(achievement => (
          <div key={achievement.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="record-title">{achievement.title}</div>
            <div>{achievement.description}</div>
            <p>Achievement unlocked on {new Date(achievement.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  )
}