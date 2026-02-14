import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'

export default function KpiCard({ issue }) {
  const priorityIndicator = issue.priority === 'high'
    ? { icon: '🔴', label: '高' }
    : { icon: '🟡', label: '中' }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 min-w-[240px] flex-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800 truncate mr-2">{issue.title}</h3>
        <span className="text-xs whitespace-nowrap">
          {priorityIndicator.icon} {priorityIndicator.label}
        </span>
      </div>
      <ProgressBar
        label={issue.kpiLabel}
        current={issue.kpiCurrent}
        target={issue.kpiTarget}
      />
      <div className="flex flex-wrap gap-1.5 mt-3">
        <Badge label={issue.category.name} color={getCategoryColor(issue.category.id)} />
        <Badge label={issue.budgetSection.name} color="#64748b" />
      </div>
    </div>
  )
}

function getCategoryColor(id) {
  const map = {
    kanko: '#3b82f6',
    kosodate: '#ec4899',
    dx: '#8b5cf6',
    infra: '#eab308',
    chiiki: '#22c55e',
    kankyo: '#14b8a6',
  }
  return map[id] || '#6b7280'
}
