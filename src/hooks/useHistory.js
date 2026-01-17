import { useState, useEffect } from 'react'
import { generateId } from '../utils/uuid'
import { getHistory, addHistoryItem, clearHistory } from '../utils/storage'

export function useHistory(counterId) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const savedHistory = getHistory(counterId)
    setHistory(savedHistory)
  }, [counterId])

  const addHistory = (action, amount, note = '') => {
    const historyItem = {
      id: generateId(),
      counterId,
      action,
      amount,
      note,
      timestamp: new Date().toISOString()
    }
    addHistoryItem(historyItem)
    setHistory([...history, historyItem])
  }

  const clearCounterHistory = () => {
    clearHistory(counterId)
    setHistory([])
  }

  const deleteHistoryItem = (itemId) => {
    const filteredHistory = history.filter(h => h.id !== itemId)
    localStorage.setItem(
      'life_counter_history',
      JSON.stringify(filteredHistory)
    )
    setHistory(filteredHistory)
  }

  return {
    history: history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    addHistory,
    clearCounterHistory,
    deleteHistoryItem
  }
}
