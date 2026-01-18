import { useRecords } from '../hooks/useRecords'

export default function Settings() {
  const { resetProgress } = useRecords()

  const handleReset = () => {
    if (window.confirm('Start fresh? 🌱')) {
      resetProgress()
    }
  }

  return (
    <div id="settings" className="settings-screen">
      <h2 className="section-title">Life Settings! ⚙️</h2>
      <div className="settings-item" onClick={() => alert('Sound effects toggled! 🔊')}>Sound Effects 🎵</div>
      <div className="settings-item" onClick={() => alert('Your progress shared! 📤')}>Share My Progress 📤</div>
      <div className="settings-item" onClick={() => alert('Colors changed! 🎨')}>Change Colors 🎨</div>
      <div className="settings-item" onClick={handleReset}>Start Fresh 🌱</div>
      <div className="settings-item" onClick={() => alert('Life Recorder v1.0\nRecord every meaningful moment! 🎉\nTrack achievements and celebrate progress! 🌟')}>About This App ❤️</div>
    </div>
  )
}