export function exportToCSV(data, filename) {
  if (!data || data.length === 0) {
    alert('没有数据可导出')
    return
  }

  const headers = Object.keys(data[0])
  const csvRows = []

  csvRows.push(headers.join(','))

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"')
      return `"${escaped}"`
    })
    csvRows.push(values.join(','))
  }

  const csvString = '\uFEFF' + csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportCounterHistoryToCSV(history, counterName) {
  const data = history.map(item => ({
    时间: formatDateTime(item.timestamp),
    计数器: counterName,
    操作类型: item.action === 'increase' ? '增加' : item.action === 'decrease' ? '减少' : '自定义',
    变化: item.amount,
    备注: item.note || ''
  }))

  exportToCSV(data, `${counterName}_历史记录_${formatDate(new Date())}.csv`)
}

export function exportAllCountersToCSV(counters) {
  const data = counters.map(counter => ({
    计数器: counter.name,
    当前计数: counter.count,
    创建时间: formatDateTime(counter.createdAt),
    最后更新: formatDateTime(counter.updatedAt)
  }))

  exportToCSV(data, `所有计数器_${formatDate(new Date())}.csv`)
}

function formatDateTime(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function formatDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
