import { useState, useMemo } from 'react'
import { municipalities, services } from '../../data'
import SummaryCard from '../ui/SummaryCard'
import FilterBar from './FilterBar'
import MatchingCard from './MatchingCard'
import MunicipalitySidebar from './MunicipalitySidebar'

const COMPANY_SERVICE_ID = 1

export default function CompanyDashboard() {
  const service = services.find((s) => s.id === COMPANY_SERVICE_ID)

  const [filters, setFilters] = useState({
    prefecture: '',
    category: '',
    budgetSection: '',
    priority: '',
  })

  // Build matching list: {municipality, issue, service}
  const allMatches = useMemo(() => {
    const matches = []
    for (const muni of municipalities) {
      for (const issue of muni.issues) {
        if (service.matchingIssueIds.includes(issue.id)) {
          matches.push({ municipality: muni, issue, service })
        }
      }
    }
    return matches
  }, [service])

  // Apply filters
  const filteredMatches = useMemo(() => {
    return allMatches.filter((m) => {
      if (filters.prefecture && m.municipality.prefecture !== filters.prefecture) return false
      if (filters.category && m.issue.category.id !== filters.category) return false
      if (filters.budgetSection && m.issue.budgetSection.code !== filters.budgetSection) return false
      if (filters.priority && m.issue.priority !== filters.priority) return false
      return true
    })
  }, [allMatches, filters])

  const [selectedMuniId, setSelectedMuniId] = useState(allMatches[0]?.municipality.id ?? null)

  const selectedMunicipality = municipalities.find((m) => m.id === selectedMuniId) || null

  // Summary data
  const uniqueMuniCount = new Set(filteredMatches.map((m) => m.municipality.id)).size
  const issueCount = filteredMatches.length
  const budgetNames = [...new Set(service.budgetSections.map((b) => b.name))].join('、')

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-1">{service.companyName}</h1>
      <p className="text-sm text-slate-500 mb-6">{service.title}</p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard value={uniqueMuniCount} label="マッチ自治体数" icon="🏛️" />
        <SummaryCard value={issueCount} label="対象課題数" icon="📋" />
        <SummaryCard value={budgetNames} label="カバー予算款" icon="💰" />
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matching list */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMatches.length === 0 ? (
            <p className="text-slate-400 text-sm">該当するマッチがありません。</p>
          ) : (
            filteredMatches.map((m) => (
              <MatchingCard
                key={`${m.municipality.id}-${m.issue.id}`}
                municipality={m.municipality}
                issue={m.issue}
                service={m.service}
                isSelected={m.municipality.id === selectedMuniId}
                onClick={() => setSelectedMuniId(m.municipality.id)}
              />
            ))
          )}
        </div>

        {/* Sidebar */}
        <div>
          <MunicipalitySidebar municipality={selectedMunicipality} />
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-8 text-center">
        ℹ️ この情報はAIにより自治体の基本計画から自動抽出されたものです
      </p>
    </div>
  )
}
