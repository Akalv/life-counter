const ICONS = [
  '🏃', '📖', '💪', '🎯', '🍎', '💧', '🧘', '🎨',
  '💻', '📝', '🎵', '📸', '✈️', '🚴', '🏊', '🎮',
  '📱', '💰', '🎁', '🌟', '🔥', '💎', '🌈', '🚀',
  '❤️', '🌺', '🌸', '🌻', '🍀', '🌲', '⭐', '🌙',
  '☀️', '🌊', '🏔️', '🏠', '🚗', '🚂', '🚢'
]

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F1948A',
  '#76D7C4', '#F9E79F', '#D7BDE2', '#AED6F1', '#F5B7B1'
]

export default function IconPicker({ selectedIcon, onSelect }) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {ICONS.map(icon => (
        <button
          type="button"
          key={icon}
          onClick={() => onSelect(icon)}
          className={`text-3xl p-2 rounded-lg transition ${
            selectedIcon === icon
              ? 'bg-blue-100 ring-2 ring-blue-500'
              : 'hover:bg-gray-100'
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}

export function ColorPicker({ selectedColor, onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {COLORS.map(color => (
        <button
          type="button"
          key={color}
          onClick={() => onSelect(color)}
          className={`w-10 h-10 rounded-full transition ${
            selectedColor === color
              ? 'ring-2 ring-offset-2 ring-gray-900'
              : 'hover:scale-110'
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
