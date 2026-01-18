import { useState } from 'react'
import { formatDateTime, isToday, isYesterday } from '../utils/dateFormat'
import { exportCounterHistoryToCSV } from '../utils/csvExport'

export default function CounterDetail({ counter, history, onAdd, onDeleteHistory, onDeleteCounter }) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const [customNote, setCustomNote] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const getLevel = (count) => {
    if (count >= 100) return { level: 5, progress: 100, label: 'LEGEND', badgeClass: 'achievement-legend', nextLevel: null }
    if (count >= 50) return { level: 4, progress: ((count - 50) / 50) * 100, label: 'MASTER', badgeClass: 'achievement-master', nextLevel: 100 }
    if (count >= 25) return { level: 3, progress: ((count - 25) / 25) * 100, label: 'EXPERT', badgeClass: 'achievement-expert', nextLevel: 50 }
    if (count >= 10) return { level: 2, progress: ((count - 10) / 15) * 100, label: 'APPRENTICE', badgeClass: 'achievement-apprentice', nextLevel: 25 }
    return { level: 1, progress: (count / 10) * 100, label: 'NOVICE', badgeClass: 'achievement-novice', nextLevel: 10 }
  }

  const { level, progress, label, badgeClass, nextLevel } = getLevel(counter.count)

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
    <div className="max-w-lg mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl p-8 mb-6 animate-bounce-in" style={{
        background: `linear-gradient(145deg, rgba(13, 13, 26, 0.95) 0%, rgba(26, 26, 62, 0.9) 100%)`,
        border: `2px solid ${counter.color}50`,
        boxShadow: `0 12px 40px ${counter.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
      }}>
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full blur-3xl opacity-20" style={{ backgroundColor: counter.color }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-3xl opacity-20" style={{ backgroundColor: counter.color }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <span
                className="text-7xl p-4 rounded-2xl animate-float block"
                style={{
                  background: `linear-gradient(135deg, ${counter.color}50, ${counter.color}30)`,
                  boxShadow: `0 8px 25px ${counter.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                  border: `2px solid ${counter.color}40`
                }}
              >
                {counter.icon}
              </span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg animate-pulse-glow">
                {level}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {counter.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <span className={`achievement-badge ${badgeClass} px-3 py-1`}>
                  LV.{level} {label}
                </span>
              </div>
              <p className="text-sm text-cyan-300 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                创建于 {formatDateTime(counter.createdAt)}
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="relative">
              <span className="font-display text-8xl font-bold block animate-level-up" style={{
                color: counter.color,
                textShadow: `0 0 30px ${counter.color}80, 0 0 60px ${counter.color}40, 0 4px 8px rgba(0,0,0,0.5)`
              }}>
                {counter.count}
              </span>
              <span className="text-2xl text-cyan-300 ml-2 font-semibold tracking-wider">XP</span>
            </div>
          </div>

          {nextLevel && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-cyan-300 font-semibold">下一等级</span>
                <span className="text-sm text-purple-300">{counter.count} / {nextLevel} XP</span>
              </div>
              <div className="xp-bar rounded-full overflow-hidden border border-white/5">
                <div
                  className="xp-bar-fill rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${counter.color}, ${counter.color}aa)`,
                    boxShadow: `0 0 20px ${counter.color}`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-4">
            <button
              onClick={handleDecrement}
              className="py-4 px-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center gap-2 group"
              style={{
                background: `linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(185, 28, 28, 0.2) 100%)`,
                border: '2px solid rgba(239, 68, 68, 0.5)',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="text-3xl text-red-400 group-hover:text-red-300 transition-colors">−</span>
              <span className="text-red-300 font-semibold tracking-wider text-sm">HP</span>
            </button>
            <button
              onClick={handleIncrement}
              className="py-4 px-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center gap-2 group"
              style={{
                background: `linear-gradient(135deg, ${counter.color}50, ${counter.color}30)`,
                border: `2px solid ${counter.color}70`,
                boxShadow: `0 4px 15px ${counter.color}50, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              }}
            >
              <span className="text-3xl text-green-400 group-hover:text-green-300 transition-colors">+</span>
              <span className="text-green-300 font-semibold tracking-wider text-sm">XP</span>
            </button>
            <button
              onClick={() => setShowCustomInput(true)}
              className="py-4 px-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center gap-2 group"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(124, 58, 237, 0.2) 100%)',
                border: '2px solid rgba(139, 92, 246, 0.5)',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors">⚡</span>
              <span className="text-purple-300 font-semibold tracking-wider text-sm">自定义</span>
            </button>
          </div>

          {showCustomInput && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-bounce-in">
                <h3 className="text-xl font-bold text-white mb-4 text-center">⚡ 自定义数值</h3>
                <div className="space-y-4">
                  <input
                    type="number"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="输入新数值"
                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="备注（可选）"
                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCustomInput(false)}
                      className="flex-1 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-semibold"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleCustomSubmit}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
                    >
                      确认
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleExport}
          className="flex-1 py-4 px-4 glass-card rounded-2xl font-semibold text-cyan-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导出数据
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex-1 py-4 px-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/30 text-red-400 rounded-2xl font-semibold hover:text-white hover:border-red-400 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          删除
        </button>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-2xl">📜</span>
          历史记录
        </h3>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📜</div>
            <p className="text-gray-400 text-lg">暂无历史记录</p>
            <p className="text-gray-500 text-sm mt-2">开始你的冒险吧！</p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedHistory.map(([date, items]) => (
              <div key={date} className="relative">
                <h4 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2 sticky top-0 bg-slate-900/50 -mx-6 px-6 py-2 rounded-xl backdrop-blur-sm">
                  <span className="text-lg">
                    {isToday(date) && '🌟'}
                    {isYesterday(date) && '📅'}
                    {!isToday(date) && !isYesterday(date) && '📅'}
                  </span>
                  {isToday(date) && '今天'}
                  {isYesterday(date) && '昨天'}
                  {!isToday(date) && !isYesterday(date) && date}
                </h4>
                <div className="space-y-3">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all duration-300 border border-white/5 hover:border-cyan-500/20"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                              item.action === 'increase'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : item.action === 'decrease'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}
                          >
                            {item.action === 'increase' && '⬆️'}
                            {item.action === 'decrease' && '⬇️'}
                            {item.action === 'manual' && '⚡'}
                            {item.amount > 0 ? `+${item.amount}` : item.amount}
                          </span>
                          <span className="text-sm text-gray-400">
                            {formatDateTime(item.timestamp).split(' ')[1]}
                          </span>
                        </div>
                        {item.note && (
                          <p className="text-sm text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                            💬 {item.note}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteHistoryItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300 rounded-lg hover:bg-red-500/10"
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-red-500/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-bounce-in">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-2">确认删除</h3>
              <p className="text-gray-300">
                确定要删除 "<span className="text-cyan-300">{counter.name}</span>" 吗？
                <br />
                <span className="text-red-400 text-sm">此操作无法撤销。</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-semibold"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/25"
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
