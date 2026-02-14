function parseNumeric(str) {
  const match = String(str).match(/-?[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

export function calcAchievement(currentStr, targetStr) {
  const current = parseNumeric(currentStr)
  const target = parseNumeric(targetStr)

  // Reverse KPI (e.g. 120人 → 0人)
  if (target < current) {
    return 0
  }
  if (target === 0) {
    return 0
  }
  return Math.min(100, Math.round((current / target) * 100))
}

export default function ProgressBar({ current, target, label, showAchievement }) {
  const percent = calcAchievement(current, target)

  const barColor =
    percent >= 70 ? 'bg-green-500' :
    percent >= 40 ? 'bg-yellow-500' :
    'bg-teal-500'

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-slate-600">{label}</span>
        <div className="flex items-center gap-2">
          {showAchievement && (
            <span className={`text-sm font-bold ${
              percent >= 70 ? 'text-green-600' :
              percent >= 40 ? 'text-yellow-600' :
              'text-teal-600'
            }`}>
              {percent}%
            </span>
          )}
          <span className="text-sm font-medium text-slate-700">
            {current} / {target}
          </span>
        </div>
      </div>
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
