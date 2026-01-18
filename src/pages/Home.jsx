import { useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import CounterForm from '../components/CounterForm'
import CounterCard from '../components/CounterCard'
import CounterDetail from '../components/CounterDetail'
import { useCounters } from '../hooks/useCounters'
import { useHistory } from '../hooks/useHistory'
import { exportAllCountersToCSV } from '../utils/csvExport'

export default function Home() {
  const navigate = useNavigate()
  const { counters, createCounter, incrementCounter, decrementCounter, deleteCounter } = useCounters()
  const [showForm, setShowForm] = useState(false)
  const [editingCounter, setEditingCounter] = useState(null)

  const handleIncrement = (counterId) => {
    const result = incrementCounter(counterId)
    if (result) {
      const { addHistory } = useHistory(counterId)
      addHistory(result.action, result.amount, result.note)
    }
  }

  const handleDecrement = (counterId) => {
    const result = decrementCounter(counterId)
    if (result) {
      const { addHistory } = useHistory(counterId)
      addHistory(result.action, result.amount, result.note)
    }
  }

  const handleCreateCounter = (data) => {
    createCounter(data.name, data.icon, data.color, data.count)
    setShowForm(false)
  }

  const handleExportAll = () => {
    exportAllCountersToCSV(counters)
  }

  const handleDeleteCounter = (counterId) => {
    deleteCounter(counterId)
    navigate('/')
  }

  const totalXP = counters.reduce((sum, counter) => sum + counter.count, 0)
  const totalCounters = counters.length
  const averageLevel = totalCounters > 0 ? Math.round(counters.reduce((sum, counter) => {
    if (counter.count >= 100) return sum + 5
    if (counter.count >= 50) return sum + 4
    if (counter.count >= 25) return sum + 3
    if (counter.count >= 10) return sum + 2
    return sum + 1
  }, 0) / totalCounters) : 0

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-pink-500/10 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-yellow-500/10 blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <Header
            title="人生计数器"
            actions={[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ),
                onClick: () => setShowForm(true)
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
                onClick: handleExportAll
              }
            ]}
          />

          <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
            {totalCounters > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-4 text-center animate-bounce-in">
                  <div className="text-3xl font-bold text-cyan-300 mb-1">{totalXP}</div>
                  <div className="text-sm text-gray-300">总经验值</div>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
                  <div className="text-3xl font-bold text-purple-300 mb-1">{totalCounters}</div>
                  <div className="text-sm text-gray-300">计数器数量</div>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-yellow-300 mb-1">Lv.{averageLevel}</div>
                  <div className="text-sm text-gray-300">平均等级</div>
                </div>
              </div>
            )}

            {counters.length === 0 && !showForm && (
              <div className="text-center py-20 animate-bounce-in">
                <div className="relative mb-8">
                  <div className="text-9xl mb-4 animate-float">🎮</div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl animate-pulse-glow"></div>
                </div>

                <h2 className="text-4xl font-bold font-display gradient-text mb-4 animate-shimmer">
                  欢迎来到人生计数器！
                </h2>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  开始你的游戏化人生记录之旅！创建各种计数器来追踪你的成就、习惯和目标。
                  <br />
                  <span className="text-cyan-300 font-semibold">每一次点击都是经验值的积累，每一个计数器都是你的专属技能！</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-2xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 font-bold text-lg hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25 flex items-center gap-3 animate-pulse-glow"
                  >
                    <span className="text-2xl">🎯</span>
                    开始创建你的第一个计数器
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="glass-card rounded-2xl p-6 animate-slide-up">
                    <div className="text-4xl mb-3">🏃</div>
                    <h3 className="text-lg font-semibold text-white mb-2">追踪习惯</h3>
                    <p className="text-gray-300 text-sm">记录跑步、读书、冥想等日常习惯</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="text-4xl mb-3">🎯</div>
                    <h3 className="text-lg font-semibold text-white mb-2">达成目标</h3>
                    <p className="text-gray-300 text-sm">设定目标并实时追踪进度</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="text-4xl mb-3">🏆</div>
                    <h3 className="text-lg font-semibold text-white mb-2">积累成就</h3>
                    <p className="text-gray-300 text-sm">升级系统让你的努力可视化</p>
                  </div>
                </div>
              </div>
            )}

            {showForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/30 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-bounce-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white font-display">创建新计数器</h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <CounterForm
                    onSave={handleCreateCounter}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              </div>
            )}

            {counters.length > 0 && (
              <div className="animate-slide-up">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">⚔️</span>
                  你的计数器
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {counters.map((counter, index) => (
                    <div key={counter.id} className="animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CounterCard
                        counter={counter}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      } />

      <Route path="/counter/:id" element={
        <CounterDetailPage
          counters={counters}
          deleteCounter={handleDeleteCounter}
        />
      } />
    </Routes>
  )
}

function CounterDetailPage({ counters, deleteCounter }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const counter = counters.find(c => c.id === id)
  const { history, addHistory, deleteHistoryItem } = useHistory(id)

  if (!counter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Header title="未找到" showBack={true} />
        <div className="max-w-lg mx-auto px-4 py-16 text-center animate-bounce-in">
          <div className="text-8xl mb-6">❓</div>
          <p className="text-gray-300 text-lg mb-6">计数器不存在或已被删除</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 font-semibold"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  const handleAdd = (action, amount, note = '') => {
    addHistory(action, amount, note)
    const { incrementCounter, decrementCounter, setCounterValue } = useCounters()

    if (action === 'increase') {
      incrementCounter(id, amount, note)
    } else if (action === 'decrease') {
      decrementCounter(id, amount, note)
    } else {
      const newCount = counter.count + amount
      setCounterValue(id, newCount, note)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Header title={counter.name} showBack={true} />
      <CounterDetail
        counter={counter}
        history={history}
        onAdd={handleAdd}
        onDeleteHistory={deleteHistoryItem}
        onDeleteCounter={deleteCounter}
      />
    </div>
  )
}
