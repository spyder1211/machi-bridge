import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import AdoptionBadge from '../ui/AdoptionBadge'
import { useToast } from '../ui/Toast'

const priorityMap = {
  high: { label: '★★★ 高', color: '#ef4444' },
  medium: { label: '★★ 中', color: '#f59e0b' },
  low: { label: '★ 低', color: '#6b7280' },
}

export default function MatchingCard({ municipality, issue, service, isSelected, onClick }) {
  const { showToast } = useToast()
  const pri = priorityMap[issue.priority] || priorityMap.medium

  const ctaByStatus = {
    adopted: { label: '導入済み', className: 'text-green-600 font-medium', disabled: true },
    considering: { label: 'フォローアップする →', className: 'text-yellow-600 hover:text-yellow-800 font-medium', disabled: false },
    none: { label: 'この自治体に提案する →', className: 'text-teal-600 hover:text-teal-800 font-medium', disabled: false },
  }
  const cta = ctaByStatus[issue.adoptionStatus] || ctaByStatus.none

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-l-4 border-teal-500' : 'border-l-4 border-transparent'
      }`}
    >
      {/* Municipality info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">{municipality.name}</span>
          <span className="text-sm text-slate-500">{municipality.prefecture}</span>
          <span className="text-sm text-slate-400">人口 {municipality.population}万人</span>
          <AdoptionBadge status={issue.adoptionStatus} />
        </div>
        <span style={{ color: pri.color }} className="text-sm font-medium">
          {pri.label}
        </span>
      </div>

      {/* Issue */}
      <h3 className="font-semibold text-slate-700 mb-1">{issue.title}</h3>
      <p className="text-sm text-slate-500 mb-3 line-clamp-2">{issue.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge label={issue.budgetSection.name} color={issue.budgetSection.code === 'soumu' ? '#6366f1' : '#78716c'} />
        <Badge label={issue.category.name} color={issue.category.id === 'dx' ? '#8b5cf6' : '#3b82f6'} />
      </div>

      {/* KPI */}
      <div className="mb-3">
        <ProgressBar current={issue.kpiCurrent} target={issue.kpiTarget} label={issue.kpiLabel} showAchievement />
      </div>

      {/* Service + CTA */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">マッチサービス: {service.title}</span>
        {cta.disabled ? (
          <span className={`text-sm ${cta.className}`}>{cta.label}</span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation()
              showToast(`${municipality.name}への提案を送信しました`)
            }}
            className={`text-sm ${cta.className}`}
          >
            {cta.label}
          </button>
        )}
      </div>
    </div>
  )
}
