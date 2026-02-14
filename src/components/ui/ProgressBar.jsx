function parseNumeric(str) {
  const match = String(str).match(/-?[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

export default function ProgressBar({ current, target, label }) {
  const currentVal = parseNumeric(current)
  const targetVal = parseNumeric(target)

  let percent
  if (targetVal < currentVal) {
    // Reverse KPI (e.g. 120人 → 0人): progress = how far we've reduced
    // If current=120, target=0, we're at 0% progress
    // We show it as "needs to go from current down to target"
    const total = currentVal - targetVal
    percent = total > 0 ? 0 : 100
  } else if (targetVal === 0) {
    percent = 0
  } else {
    percent = Math.min(100, (currentVal / targetVal) * 100)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-medium text-slate-700">
          {current} / {target}
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
