import { useState } from 'react'
import { formatDateTime, isToday, isYesterday } from '../utils/dateFormat'
import { exportCounterHistoryToCSV } from '../utils/csvExport'

export default function CounterDetail({ counter, history, onAdd, onDeleteHistory, onDeleteCounter }) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const [customNote, setCustomNote] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleIncrement = () => {
    onAdd('increase', 1)
  }

  const handleDecrement = () => {
    onAdd('decrease', 1)
  }

  const handleCustomSubmit = () => {
    const value = parseInt(customValue)
    if (!isNaN(value) && value >= 0) {
      onAdd('manual', value - counter.count, customNote)
      setShowCustomInput(false)
      setCustomValue('')
      setCustomNote('')
    }
  }

  const handleDelete = () => {
    onDeleteCounter(counter.id)
  }

  const handleExport = () => {
    exportCounterHistoryToCSV(history, counter.name)
  }

  const handleDeleteHistoryItem = (itemId) => {
    onDeleteHistory(itemId)
  }

  const groupHistoryByDate = (historyItems) => {
    const groups = {}
    historyItems.forEach(item => {
      const date = item.timestamp.split('T')[0]
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(item)
    })
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
  }

  const groupedHistory = groupHistoryByDate(history)

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-5xl p-3 rounded-2xl"
            style={{ backgroundColor: `${counter.color}20` }}
          >
            {counter.icon}
          </span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {counter.name}
            </h2>
            <p className="text-sm text-gray-500">
              创建于 {formatDateTime(counter.createdAt)}
            </p>
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="text-6xl font-bold" style={{ color: counter.color }}>
            {counter.count}
          </span>
          <span className="text-xl text-gray-500 ml-2">次</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-medium"
          >
            -1
          </button>
          <button
            onClick={handleIncrement}
            className="px-4 py-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition font-medium"
          >
            +1
          </button>
          <button
            onClick={() => setShowCustomInput(true)}
            className="px-4 py-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition font-medium"
          >
            自定义
          </button>
        </div>

        {showCustomInput && (
          <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="输入新值"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="备注（可选）"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowCustomInput(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                取消
              </button>
              <button
                onClick={handleCustomSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                确认
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleExport}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导出CSV
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex-1 px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          删除
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">历史记录</h3>

        {history.length === 0 ? (
          <p className="text-center text-gray-500 py-8">暂无历史记录</p>
        ) : (
          <div className="space-y-4">
            {groupedHistory.map(([date, items]) => (
              <div key={date}>
                <h4 className="text-sm font-medium text-gray-500 mb-3 sticky top-0 bg-white py-2">
                  {isToday(date) && '今天'}
                  {isYesterday(date) && '昨天'}
                  {!isToday(date) && !isYesterday(date) && date}
                </h4>
                <div className="space-y-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              item.action === 'increase'
                                ? 'bg-green-100 text-green-700'
                                : item.action === 'decrease'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.action === 'increase' && '+'}
                            {item.action === 'decrease' && '-'}
                            {item.amount}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDateTime(item.timestamp).split(' ')[1]}
                          </span>
                        </div>
                        {item.note && (
                          <p className="text-sm text-gray-600">{item.note}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteHistoryItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">确认删除</h3>
            <p className="text-gray-600 mb-6">
              确定要删除 "{counter.name}" 吗？此操作无法撤销。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
