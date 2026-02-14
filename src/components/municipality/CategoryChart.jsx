import { categories, budgetSections } from '../../data'

export default function CategoryChart({ issues }) {
  const categoryCounts = {}
  const budgetCounts = {}

  issues.forEach((issue) => {
    categoryCounts[issue.category.id] = (categoryCounts[issue.category.id] || 0) + 1
    budgetCounts[issue.budgetSection.code] = (budgetCounts[issue.budgetSection.code] || 0) + 1
  })

  const maxCat = Math.max(...Object.values(categoryCounts), 1)
  const maxBudget = Math.max(...Object.values(budgetCounts), 1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">📊 カテゴリ別 課題数</h3>
        <div className="space-y-3">
          {Object.entries(categoryCounts).map(([id, count]) => {
            const cat = categories.find((c) => c.id === id)
            return (
              <div key={id}>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>{cat?.name || id}</span>
                  <span>{count}件</span>
                </div>
                <div className="h-5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(count / maxCat) * 100}%`,
                      backgroundColor: cat?.color || '#6b7280',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">💰 予算区分別 課題数</h3>
        <div className="space-y-3">
          {Object.entries(budgetCounts).map(([code, count]) => {
            const sec = budgetSections.find((b) => b.code === code)
            return (
              <div key={code}>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>{sec?.name || code}</span>
                  <span>{count}件</span>
                </div>
                <div className="h-5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(count / maxBudget) * 100}%`,
                      backgroundColor: sec?.color || '#6b7280',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
