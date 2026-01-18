import { useState } from 'react'
import { useRecords } from '../hooks/useRecords'

export default function AddRecord({ onClose, onSave }) {
  const { createRecord } = useRecords()
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(1)
  const [selectedEmoji, setSelectedEmoji] = useState('🎯')

  const emojis = ['🎯', '💧', '🏃‍♀️', '📖', '🥗', '💪', '🧘', '🎨', '🎵', '📱', '💼', '❤️', '🌟', '🔥', '⚡', '🎉']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      createRecord(`${selectedEmoji} ${title}`, target)
      showConfetti()
      onSave()
      setTitle('')
      setTarget(1)
      setSelectedEmoji('🎯')
    }
  }

  const showConfetti = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.textContent = '🎉'
        confetti.style.position = 'fixed'
        confetti.style.left = Math.random() * window.innerWidth + 'px'
        confetti.style.top = '-20px'
        confetti.style.fontSize = '20px'
        confetti.style.pointerEvents = 'none'
        confetti.style.zIndex = '9999'
        document.body.appendChild(confetti)

        const animation = confetti.animate([
          { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
          { transform: 'translateY(' + window.innerHeight + 'px) rotate(360deg)', opacity: 0 }
        ], {
          duration: 2000,
          easing: 'ease-out'
        })

        animation.onfinish = () => confetti.remove()
      }, i * 100)
    }
  }

  return (
    <div id="add-event" className="add-event-screen">
      <h2 className="section-title">Add New Life Record! 🎈</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="record-emoji">Choose an Emoji</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            {emojis.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                style={{
                  fontSize: '24px',
                  padding: '8px',
                  border: selectedEmoji === emoji ? '2px solid #FF6B6B' : '2px solid #FFD93D',
                  borderRadius: '8px',
                  background: selectedEmoji === emoji ? '#FFF' : '#F9F9F9',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="record-title">Record Name</label>
          <input
            type="text"
            id="record-title"
            className="form-input"
            required
            placeholder="What important thing do you want to record?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="record-target">Daily Goal</label>
          <input
            type="number"
            id="record-target"
            className="form-input"
            min="1"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 1)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Record! 🎉</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Never Mind 😊</button>
      </form>
    </div>
  )
}