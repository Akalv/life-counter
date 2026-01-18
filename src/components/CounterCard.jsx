import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../utils/dateFormat'

export default function CounterCard({ counter, onIncrement, onDecrement }) {
  const getLevel = (count) => {
    if (count >= 100) return { level: 5, progress: 100, label: 'LEGEND', badgeClass: 'achievement-legend' }
    if (count >= 50) return { level: 4, progress: 100, label: 'MASTER', badgeClass: 'achievement-master' }
    if (count >= 25) return { level: 3, progress: 100, label: 'EXPERT', badgeClass: 'achievement-expert' }
    if (count >= 10) return { level: 2, progress: ((count - 10) / 15) * 100, label: 'APPRENTICE', badgeClass: 'achievement-apprentice' }
    return { level: 1, progress: (count / 10) * 100, label: 'NOVICE', badgeClass: 'achievement-novice' }
  }

  const { level, progress, label, badgeClass } = getLevel(counter.count)

  return (
    <Link
      to={`/counter/${counter.id}`}
      className="group block relative overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-border-glow"
      style={{
        background: `linear-gradient(145deg, rgba(13, 13, 26, 0.95) 0%, rgba(26, 26, 62, 0.9) 100%)`,
        border: `2px solid ${counter.color}50`,
        boxShadow: `0 8px 30px ${counter.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
      }}
    >
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundColor: counter.color }} />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundColor: counter.color }} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span
                className="text-5xl md:text-6xl p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-2xl block"
                style={{
                  background: `linear-gradient(135deg, ${counter.color}50, ${counter.color}30)`,
                  boxShadow: `0 8px 25px ${counter.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                  border: `2px solid ${counter.color}40`
                }}
              >
                {counter.icon}
              </span>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse-glow">
                {level}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-md">
                {counter.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`achievement-badge ${badgeClass} px-3 py-1 text-xs`}>
                  LV.{level} {label}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatRelativeTime(counter.updatedAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="text-right">
              <span className="font-display text-4xl md:text-5xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl block" style={{
                color: counter.color,
                textShadow: `0 0 30px ${counter.color}80, 0 0 60px ${counter.color}40`
              }}>
                {counter.count}
              </span>
              <span className="text-sm text-cyan-300 ml-1 font-semibold tracking-wider">XP</span>
            </div>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-black/40 mb-5 overflow-hidden border border-white/5" style={{
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.6)'
        }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${counter.color}, ${counter.color}aa)`,
              boxShadow: `0 0 20px ${counter.color}`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDecrement(counter.id)
            }}
            className="flex-1 py-3.5 px-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group/btn"
            style={{
              background: `linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(185, 28, 28, 0.2) 100%)`,
              border: '2px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(239, 68, 68, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <span className="text-2xl text-red-400 group-hover/btn:text-red-300 transition-colors">-</span>
            <span className="text-red-300 font-semibold tracking-wider">HP</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onIncrement(counter.id)
            }}
            className="flex-1 py-3.5 px-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group/btn"
            style={{
              background: `linear-gradient(135deg, ${counter.color}50, ${counter.color}30)`,
              border: `2px solid ${counter.color}70`,
              boxShadow: `0 4px 15px ${counter.color}50, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 25px ${counter.color}70, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 15px ${counter.color}50, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            }}
          >
            <span className="text-2xl text-green-400 group-hover/btn:text-green-300 transition-colors">+</span>
            <span className="text-green-300 font-semibold tracking-wider">XP</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
