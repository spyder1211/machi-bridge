import { useState } from 'react'
import { municipalities, budgetSections, categories } from '../../data'
import StatsCards from './StatsCards'
import BudgetIssueMap from './BudgetIssueMap'

const muni = municipalities[0] // みらい市

const priorities = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
]

export default function CouncilDashboard() {
  const [filters, setFilters] = useState({
    budgetSection: '',
    priority: '',
    category: '',
  })

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const selectClass =
    'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500'

  // Only show budget sections that appear in みらい市's issues
  const relevantBudgetCodes = [...new Set(muni.issues.map((i) => i.budgetSection.code))]
  const relevantBudgetSections = budgetSections.filter((b) =>
    relevantBudgetCodes.includes(b.code)
  )
  const relevantCategoryIds = [...new Set(muni.issues.map((i) => i.category.id))]
  const relevantCategories = categories.filter((c) =>
    relevantCategoryIds.includes(c.id)
  )

  const filteredIssues = muni.issues.filter((issue) => {
    if (filters.budgetSection && issue.budgetSection.code !== filters.budgetSection) return false
    if (filters.priority && issue.priority !== filters.priority) return false
    if (filters.category && issue.category.id !== filters.category) return false
    return true
  })

  return (
    <div>
      {/* Municipality header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏛</span>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {muni.name}（{muni.prefecture}）
              <span className="ml-3 text-base font-normal text-slate-500">
                人口: {muni.population}万人
              </span>
            </h2>
            <p className="text-sm text-teal-700 font-medium mt-1">{muni.planName}</p>
            <p className="text-sm text-slate-600 mt-1">{muni.direction}</p>
          </div>
        </div>
      </div>

      <StatsCards />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className={selectClass}
          value={filters.budgetSection}
          onChange={(e) => handleChange('budgetSection', e.target.value)}
        >
          <option value="">予算款：すべて</option>
          {relevantBudgetSections.map((b) => (
            <option key={b.code} value={b.code}>{b.name}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          <option value="">優先度：すべて</option>
          {priorities.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">カテゴリ：すべて</option>
          {relevantCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <BudgetIssueMap issues={filteredIssues} />
    </div>
  )
}
