import { municipalities } from '../../data'
import PlanHeader from './PlanHeader'
import KpiCard from './KpiCard'
import IssueAccordion from './IssueAccordion'
import CategoryChart from './CategoryChart'

export default function MunicipalityDashboard() {
  const muni = municipalities[0] // みらい市

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          🏛 {muni.name}（{muni.prefecture}・人口{muni.population}万人）
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          課題にマッチした企業サービスでKPI達成へ
        </p>
      </div>

      <PlanHeader planName={muni.planName} direction={muni.direction} />

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">📈 KPI概況</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {muni.issues.map((issue) => (
            <KpiCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      <IssueAccordion issues={muni.issues} />

      <CategoryChart issues={muni.issues} />
    </div>
  )
}
