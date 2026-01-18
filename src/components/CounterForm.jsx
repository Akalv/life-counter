import { useState } from 'react'
import IconPicker, { ColorPicker } from './IconPicker'

export default function CounterForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || '')
  const [icon, setIcon] = useState(initialData?.icon || '🏃')
  const [color, setColor] = useState(initialData?.color || '#FF6B6B')
  const [initialCount, setInitialCount] = useState(initialData?.count || 0)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(0)

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

  const steps = [
    { title: '选择头像', icon: '🎭', description: '为你的计数器选择一个代表图标' },
    { title: '自定义外观', icon: '🎨', description: '选择颜色让它更独特' },
    { title: '设置属性', icon: '⚙️', description: '给它命名并设置初始值' }
  ]

  return (
    <div className="animate-bounce-in">
      <div className="flex items-center justify-center gap-4 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
              index <= currentStep
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg animate-pulse-glow'
                : 'bg-slate-700 text-gray-400'
            }`}>
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                index < currentStep
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                  : 'bg-slate-600'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 font-display">
          {steps[currentStep].title}
        </h2>
        <p className="text-gray-300">{steps[currentStep].description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep >= 2 && (
          <div className="animate-slide-up">
            <label className="block text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-2xl">🏷️</span>
              计数器名称
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (e.target.value.trim()) setCurrentStep(Math.max(currentStep, 2))
                }}
                placeholder="给它起个响亮的名字..."
                className="w-full px-4 py-4 bg-slate-800/50 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 text-lg"
              />
              {name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-400 animate-shake">{errors.name}</p>
            )}
          </div>
        )}

        <div className="animate-slide-up">
          <label className="block text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
            <span className="text-2xl">🎭</span>
            选择图标
          </label>
          <div className="bg-slate-800/30 rounded-xl p-4 border-2 border-purple-500/20">
            <IconPicker
              selectedIcon={icon}
              onSelect={(selectedIcon) => {
                setIcon(selectedIcon)
                setCurrentStep(Math.max(currentStep, 0))
              }}
            />
          </div>
        </div>

        <div className="animate-slide-up">
          <label className="block text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            选择颜色主题
          </label>
          <div className="bg-slate-800/30 rounded-xl p-4 border-2 border-purple-500/20">
            <ColorPicker
              selectedColor={color}
              onSelect={(selectedColor) => {
                setColor(selectedColor)
                setCurrentStep(Math.max(currentStep, 1))
              }}
            />
          </div>
        </div>

        {currentStep >= 2 && (
          <div className="animate-slide-up">
            <label className="block text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              初始经验值
            </label>
            <div className="relative">
              <input
                type="number"
                value={initialCount}
                onChange={(e) => setInitialCount(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-4 py-4 bg-slate-800/50 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 text-lg"
                placeholder="从多少开始你的冒险..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 font-semibold">
                XP
              </div>
            </div>
            {errors.initialCount && (
              <p className="mt-2 text-sm text-red-400 animate-shake">{errors.initialCount}</p>
            )}
          </div>
        )}

        {(name || icon !== '🏃' || color !== '#FF6B6B' || initialCount > 0) && (
          <div className="animate-bounce-in">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-xl">👀</span>
              预览效果
            </h3>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span
                    className="text-4xl p-3 rounded-xl animate-float"
                    style={{
                      background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                      border: `2px solid ${color}50`,
                      boxShadow: `0 8px 25px ${color}30`
                    }}
                  >
                    {icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {name || '计数器名称'}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color }}>
                      {initialCount || 0}
                    </span>
                    <span className="text-cyan-300 font-semibold">XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 px-6 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-semibold text-lg hover:scale-105 active:scale-95 shadow-lg"
          >
            取消
          </button>
          <button
            type="submit"
            className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 font-semibold text-lg hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
            disabled={!name.trim()}
          >
            <span className="flex items-center gap-2">
              <span>🎯</span>
              创建计数器
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
