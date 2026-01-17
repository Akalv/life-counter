import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../utils/dateFormat'

export default function CounterCard({ counter, onIncrement, onDecrement }) {
  return (
    <Link
      to={`/counter/${counter.id}`}
      className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="text-4xl p-2 rounded-xl"
            style={{ backgroundColor: `${counter.color}20` }}
          >
            {counter.icon}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {counter.name}
            </h3>
            <p className="text-sm text-gray-500">
              {formatRelativeTime(counter.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-4xl font-bold" style={{ color: counter.color }}>
            {counter.count}
          </span>
          <span className="text-sm text-gray-500 ml-1">次</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDecrement(counter.id)
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onIncrement(counter.id)
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}
