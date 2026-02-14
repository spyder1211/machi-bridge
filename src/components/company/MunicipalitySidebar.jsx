import Badge from '../ui/Badge'

const priorityMap = {
  high: { label: '高', color: '#ef4444' },
  medium: { label: '中', color: '#f59e0b' },
  low: { label: '低', color: '#6b7280' },
}

export default function MunicipalitySidebar({ municipality }) {
  if (!municipality) return null

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 transition-shadow hover:shadow-lg">
      <h2 className="text-lg font-bold text-slate-800 mb-1">{municipality.name}</h2>
      <p className="text-sm text-slate-500 mb-4">{municipality.prefecture} ・ 人口 {municipality.population}万人</p>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-600 mb-1">計画名</h3>
        <p className="text-sm text-slate-700">{municipality.planName}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-600 mb-1">方向性</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{municipality.direction}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-600 mb-2">課題一覧</h3>
        <ul className="space-y-2">
          {municipality.issues.map((issue) => {
            const pri = priorityMap[issue.priority] || priorityMap.medium
            return (
              <li key={issue.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{issue.title}</span>
                <Badge label={pri.label} color={pri.color} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
