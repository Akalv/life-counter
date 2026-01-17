const COUNTERS_KEY = 'life_counter_counters'
const HISTORY_KEY = 'life_counter_history'

export function getCounters() {
  try {
    const data = localStorage.getItem(COUNTERS_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('读取计数器数据失败:', error)
    return []
  }
}

export function saveCounters(counters) {
  try {
    localStorage.setItem(COUNTERS_KEY, JSON.stringify(counters))
  } catch (error) {
    console.error('保存计数器数据失败:', error)
    alert('存储空间不足，无法保存数据')
  }
}

export function getHistory(counterId) {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    const allHistory = data ? JSON.parse(data) : []
    return counterId ? allHistory.filter(h => h.counterId === counterId) : allHistory
  } catch (error) {
    console.error('读取历史记录失败:', error)
    return []
  }
}

export function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch (error) {
    console.error('保存历史记录失败:', error)
    alert('存储空间不足，无法保存历史记录')
  }
}

export function addHistoryItem(historyItem) {
  const history = getHistory()
  history.push(historyItem)
  saveHistory(history)
}

export function clearHistory(counterId) {
  const history = getHistory()
  const filteredHistory = counterId
    ? history.filter(h => h.counterId !== counterId)
    : []
  saveHistory(filteredHistory)
}
