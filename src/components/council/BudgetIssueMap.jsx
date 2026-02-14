import { services, budgetSections } from '../../data'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import AdoptionBadge from '../ui/AdoptionBadge'
import { useToast } from '../ui/Toast'

export default function BudgetIssueMap({ issues }) {
  const { showToast } = useToast()

  // Group issues by budget section code
  const grouped = {}
  issues.forEach((issue) => {
    const code = issue.budgetSection.code
    if (!grouped[code]) grouped[code] = []
    grouped[code].push(issue)
  })

  const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#6b7280' }
  const priorityLabels = { high: '高', medium: '中', low: '低' }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([code, sectionIssues]) => {
        const bs = budgetSections.find((b) => b.code === code)
        return (
          <div key={code}>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: bs?.color }}
              />
              <h3 className="text-lg font-bold text-slate-800">{bs?.name || code}</h3>
            </div>

            <div className="grid gap-4">
              {sectionIssues.map((issue) => {
                const matched = services.filter((s) =>
                  s.matchingIssueIds.includes(issue.id)
                )
                return (
                  <div
                    key={issue.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold text-slate-800">{issue.title}</h4>
                      <Badge
                        label={`優先度: ${priorityLabels[issue.priority]}`}
                        color={priorityColors[issue.priority]}
                      />
                      <AdoptionBadge status={issue.adoptionStatus} />
                    </div>

                    <div className="mb-4">
                      <ProgressBar
                        current={issue.kpiCurrent}
                        target={issue.kpiTarget}
                        label={issue.kpiLabel}
                        showAchievement
                      />
                    </div>

                    {matched.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">
                          解決策の選択肢:
                        </p>
                        <div className="space-y-2">
                          {matched.map((svc) => {
                            const isAdopted = issue.adoptedServiceId === svc.id
                            return (
                              <div
                                key={svc.id}
                                className={`rounded-lg p-3 ${
                                  isAdopted ? 'bg-green-50 border border-green-300' : 'bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-slate-700">
                                    {svc.title}
                                  </p>
                                  {isAdopted && (
                                    <span className="text-xs font-medium text-green-700 bg-green-200 px-1.5 py-0.5 rounded">導入中</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {svc.description.slice(0, 80)}...
                                </p>
                              </div>
                            )
                          })}
                        </div>
                        <button
                          className="mt-3 text-sm text-teal-600 hover:text-teal-800 font-medium"
                          onClick={() =>
                            showToast('関連サービス一覧は今後実装予定です')
                          }
                        >
                          関連サービスをすべて見る →
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {issues.length === 0 && (
        <p className="text-slate-400 text-center py-12">
          条件に一致する課題がありません
        </p>
      )}
    </div>
  )
}
