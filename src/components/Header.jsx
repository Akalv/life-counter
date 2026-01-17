import { Link } from 'react-router-dom'

export default function Header({ title, showBack = false, actions = [] }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
