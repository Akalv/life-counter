import { useState } from 'react'
import IconPicker, { ColorPicker } from './IconPicker'

export default function CounterForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || '')
  const [icon, setIcon] = useState(initialData?.icon || '🏃')
  const [color, setColor] = useState(initialData?.color || '#FF6B6B')
  const [initialCount, setInitialCount] = useState(initialData?.count || 0)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!name.trim()) {
      newErrors.name = '请输入名称'
    }
    if (initialCount < 0) {
      newErrors.initialCount = '初始值不能为负数'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave({
      name: name.trim(),
      icon,
      color,
      count: initialCount
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名称
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：跑步、读书..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          图标
        </label>
        <IconPicker selectedIcon={icon} onSelect={setIcon} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          颜色
        </label>
        <ColorPicker selectedColor={color} onSelect={setColor} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          初始值
        </label>
        <input
          type="number"
          value={initialCount}
          onChange={(e) => setInitialCount(parseInt(e.target.value) || 0)}
          min="0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.initialCount && (
          <p className="mt-1 text-sm text-red-600">{errors.initialCount}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          取消
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          保存
        </button>
      </div>
    </form>
  )
}
