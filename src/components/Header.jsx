import { Link } from 'react-router-dom'

export default function Header({ title, showBack = false, actions = [] }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl px-4 py-4 border-b border-purple-500/30 relative" style={{
      background: 'linear-gradient(180deg, rgba(13, 13, 26, 0.95) 0%, rgba(26, 26, 62, 0.9) 100%)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)'
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
      <div className="max-w-lg mx-auto flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link to="/" className="group relative p-2.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/20 hover:from-purple-500/40 hover:to-cyan-500/30 border-2 border-purple-500/40 hover:border-cyan-400/60 transition-all duration-300 hover:scale-110 active:scale-95 animate-border-glow">
              <svg className="w-6 h-6 text-cyan-300 group-hover:text-white transition-colors duration-300 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <div className="relative">
            <h1 className="font-display text-2xl md:text-3xl font-bold gradient-text tracking-wide drop-shadow-lg" style={{
              textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
            }}>
              {title}
            </h1>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 opacity-70" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="group relative p-2.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/20 hover:from-purple-500/40 hover:to-cyan-500/30 border-2 border-purple-500/40 hover:border-cyan-400/60 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 animate-border-glow"
              style={{
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="text-cyan-300 group-hover:text-white transition-colors duration-300 drop-shadow-lg filter brightness-110">
                {action.icon}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
