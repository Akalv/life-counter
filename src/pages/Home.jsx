import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
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

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-gray-50">
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

          <main className="max-w-lg mx-auto px-4 py-6">
            {counters.length === 0 && !showForm && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  开始记录你的人生
                </h2>
                <p className="text-gray-500 mb-6">
                  点击右上角的 + 号创建你的第一个计数器
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  创建计数器
                </button>
              </div>
            )}

            {showForm && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <CounterForm
                  onSave={handleCreateCounter}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            {counters.length > 0 && (
              <div className="space-y-4">
                {counters.map(counter => (
                  <CounterCard
                    key={counter.id}
                    counter={counter}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                ))}
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
  const { useParams, useNavigate } = require('react-router-dom')
  const navigate = useNavigate()
  const { id } = useParams()
  const counter = counters.find(c => c.id === id)
  const { history, addHistory, deleteHistoryItem } = useHistory(id)

  if (!counter) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="未找到" showBack={true} />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">计数器不存在或已被删除</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
    <div className="min-h-screen bg-gray-50">
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
