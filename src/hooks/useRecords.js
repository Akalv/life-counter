import { useState, useEffect } from 'react'

const RECORDS_KEY = 'life_records_data'

function getToday() {
  return new Date().toISOString().split('T')[0] // YYYY-MM-DD
}

function getRecords() {
  try {
    const data = localStorage.getItem(RECORDS_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.records || []
    }

    // Check for old habits data and migrate
    const oldHabitsKey = 'habit_tracker_habits'
    const oldData = localStorage.getItem(oldHabitsKey)
    if (oldData) {
      const oldHabits = JSON.parse(oldData)
      const migratedRecords = oldHabits.map(habit => ({
        id: habit.id,
        title: habit.title,
        target: habit.target,
        dailyProgress: {}
      }))
      // Save migrated data
      localStorage.setItem(RECORDS_KEY, JSON.stringify({
        records: migratedRecords,
        stats: { happyDays: 0 },
        achievements: []
      }))
      // Remove old data
      localStorage.removeItem(oldHabitsKey)
      return migratedRecords
    }

    // Return empty array for new users
    return []
  } catch (error) {
    console.error('读取记录数据失败:', error)
    return []
  }
}

function getStats() {
  try {
    const data = localStorage.getItem(RECORDS_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.stats || { happyDays: 0 }
    }
    return { happyDays: 0 }
  } catch (error) {
    console.error('读取统计数据失败:', error)
    return { happyDays: 0 }
  }
}

function getAchievements() {
  try {
    const data = localStorage.getItem(RECORDS_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.achievements || []
    }
    return []
  } catch (error) {
    console.error('读取成就数据失败:', error)
    return []
  }
}

function saveData(records, stats, achievements) {
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify({ records, stats, achievements }))
  } catch (error) {
    console.error('保存数据失败:', error)
  }
}

export function useRecords() {
  const [records, setRecords] = useState([])
  const [stats, setStats] = useState({ happyDays: 0 })
  const [achievements, setAchievements] = useState([])

  const loadData = () => {
    const savedRecords = getRecords()
    const savedStats = getStats()
    const savedAchievements = getAchievements()
    setRecords(savedRecords)
    setStats(savedStats)
    setAchievements(savedAchievements)
  }

  useEffect(() => {
    loadData()
    // Listen for data updates from other components
    const handleStorageChange = (e) => {
      if (e.key === RECORDS_KEY) {
        loadData()
      }
    }
    const handleRecordsUpdate = () => {
      loadData()
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('recordsUpdated', handleRecordsUpdate)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('recordsUpdated', handleRecordsUpdate)
    }
  }, [])

  useEffect(() => {
    if (records.length > 0) {
      saveData(records, stats, achievements)
    }
  }, [records, stats, achievements])

  const createRecord = (title, target) => {
    const id = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-')
    const newRecord = {
      id: id,
      title: title,
      target: target,
      dailyProgress: {}
    }
    const newRecords = [...records, newRecord]
    setRecords(newRecords)
    saveData(newRecords, stats, achievements)
    // Notify other components of data change
    window.dispatchEvent(new CustomEvent('recordsUpdated'))
    return newRecord
  }

  const updateCount = (recordId, change) => {
    const today = getToday()
    let hasNewAchievement = false
    let newAchievementsList = achievements

    const updatedRecords = records.map(record => {
      if (record.id === recordId) {
        const current = (record.dailyProgress[today]?.current || 0) + change
        const newCurrent = Math.max(0, current)
        const wasCompleted = record.dailyProgress[today]?.completed || false
        const nowCompleted = newCurrent >= record.target

        // Check if this completion is new
        if (nowCompleted && !wasCompleted) {
          hasNewAchievement = true
          const achievement = {
            id: `${recordId}-${today}`,
            title: `${record.title} Completed! 🎉`,
            description: `Completed ${record.title} with ${newCurrent}/${record.target}`,
            date: today,
            recordId: recordId
          }
          newAchievementsList = [achievement, ...achievements]
        }

        const updatedRecord = {
          ...record,
          dailyProgress: {
            ...record.dailyProgress,
            [today]: {
              current: newCurrent,
              completed: nowCompleted
            }
          }
        }
        return updatedRecord
      }
      return record
    })

    setRecords(updatedRecords)
    if (hasNewAchievement) {
      setAchievements(newAchievementsList)
    }
    saveData(updatedRecords, stats, hasNewAchievement ? newAchievementsList : achievements)
    window.dispatchEvent(new CustomEvent('recordsUpdated'))

    setTimeout(updateDailyStats, 0)
  }

  const updateDailyStats = () => {
    const today = getToday()
    const todayRecords = records.map(record => ({
      ...record,
      todayCurrent: record.dailyProgress[today]?.current || 0
    }))

    const totalCurrent = todayRecords.reduce((sum, record) => sum + record.todayCurrent, 0)
    const totalTarget = records.reduce((sum, record) => sum + record.target, 0)
    const funLevel = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0
    const smiles = totalCurrent
    const achievements = todayRecords.filter(record => (record.dailyProgress[today]?.completed || false)).length

    // Check if today should be a happy day
    const isHappyDay = funLevel > 70
    const currentStats = getStats()
    const lastCheckedDate = localStorage.getItem('last_happy_check') || '2000-01-01'

    if (isHappyDay && lastCheckedDate !== today) {
      setStats(prev => ({ ...prev, happyDays: prev.happyDays + 1 }))
      localStorage.setItem('last_happy_check', today)
    }
  }

  const getDailyStats = () => {
    const today = getToday()
    const todayRecords = records.map(record => ({
      ...record,
      todayCurrent: record.dailyProgress[today]?.current || 0
    }))

    const totalCurrent = todayRecords.reduce((sum, record) => sum + record.todayCurrent, 0)
    const totalTarget = records.reduce((sum, record) => sum + record.target, 0)
    const funLevel = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0
    const smiles = totalCurrent
    const achievements = todayRecords.filter(record => (record.dailyProgress[today]?.completed || false)).length

    return { funLevel, smiles, achievements }
  }

  const resetProgress = () => {
    setRecords(records.map(record => ({ ...record, dailyProgress: {} })))
    setStats({ happyDays: 0 })
    setAchievements([])
    localStorage.removeItem('last_happy_check')
    window.dispatchEvent(new CustomEvent('recordsUpdated'))
  }

  return {
    records,
    stats,
    achievements,
    createRecord,
    updateCount,
    resetProgress,
    getDailyStats
  }
}
