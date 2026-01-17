import { useState, useEffect } from 'react'
import { generateId } from '../utils/uuid'
import { getCounters, saveCounters } from '../utils/storage'

export function useCounters() {
  const [counters, setCounters] = useState([])

  useEffect(() => {
    const savedCounters = getCounters()
    setCounters(savedCounters)
  }, [])

  useEffect(() => {
    if (counters.length > 0 || JSON.stringify(getCounters()) !== JSON.stringify(counters)) {
      saveCounters(counters)
    }
  }, [counters])

  const createCounter = (name, icon, color, initialCount = 0) => {
    const newCounter = {
      id: generateId(),
      name,
      icon,
      color,
      count: initialCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCounters([...counters, newCounter])
    return newCounter
  }

  const updateCounter = (id, updates) => {
    setCounters(counters.map(counter =>
      counter.id === id
        ? { ...counter, ...updates, updatedAt: new Date().toISOString() }
        : counter
    ))
  }

  const deleteCounter = (id) => {
    setCounters(counters.filter(counter => counter.id !== id))
  }

  const incrementCounter = (id, amount = 1, note = '') => {
    const counter = counters.find(c => c.id === id)
    if (counter) {
      updateCounter(id, { count: counter.count + amount })
      return { action: 'increase', amount, note }
    }
    return null
  }

  const decrementCounter = (id, amount = 1, note = '') => {
    const counter = counters.find(c => c.id === id)
    if (counter) {
      const newCount = Math.max(0, counter.count - amount)
      updateCounter(id, { count: newCount })
      return { action: 'decrease', amount, note }
    }
    return null
  }

  const setCounterValue = (id, value, note = '') => {
    const counter = counters.find(c => c.id === id)
    if (counter) {
      const amount = value - counter.count
      updateCounter(id, { count: value })
      return { action: 'manual', amount, note }
    }
    return null
  }

  return {
    counters,
    createCounter,
    updateCounter,
    deleteCounter,
    incrementCounter,
    decrementCounter,
    setCounterValue
  }
}
