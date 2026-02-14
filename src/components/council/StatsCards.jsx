import { municipalities, services } from '../../data'

const muni = municipalities[0] // みらい市

export default function StatsCards() {
  const issueCount = muni.issues.length
  const highPriority = muni.issues.filter((i) => i.priority === 'high').length
  const uniqueBudgetSections = new Set(muni.issues.map((i) => i.budgetSection.code)).size
  const issueIds = muni.issues.map((i) => i.id)
  const matchingServices = services.filter((s) =>
    s.matchingIssueIds.some((id) => issueIds.includes(id))
  ).length

  const cards = [
    { label: '課題総数', value: issueCount, color: 'bg-blue-50 text-blue-700' },
    { label: '高優先度', value: highPriority, color: 'bg-red-50 text-red-700' },
    { label: '対応する予算款', value: uniqueBudgetSections, color: 'bg-purple-50 text-purple-700' },
    { label: '解決策の候補', value: matchingServices, color: 'bg-teal-50 text-teal-700' },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl p-5 transition-shadow hover:shadow-lg ${c.color}`}>
          <p className="text-sm font-medium opacity-80">{c.label}</p>
          <p className="text-3xl font-bold mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  )
}
