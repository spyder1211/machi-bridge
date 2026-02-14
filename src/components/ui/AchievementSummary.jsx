import { calcAchievement } from './ProgressBar'

export default function AchievementSummary({ issues }) {
  const adopted = issues.filter((i) => i.adoptionStatus === 'adopted').length
  const considering = issues.filter((i) => i.adoptionStatus === 'considering').length
  const none = issues.filter((i) => i.adoptionStatus === 'none').length

  const achievements = issues.map((i) => calcAchievement(i.kpiCurrent, i.kpiTarget))
  const avg = achievements.length > 0
    ? Math.round(achievements.reduce((a, b) => a + b, 0) / achievements.length)
    : 0

  const avgColor =
    avg >= 70 ? 'text-green-600' :
    avg >= 40 ? 'text-yellow-600' :
    'text-teal-600'

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">📊 計画達成状況</h2>
      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className={`text-4xl font-bold ${avgColor}`}>{avg}%</p>
          <p className="text-sm text-slate-500 mt-1">平均達成率</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">{adopted}</p>
            <p className="text-xs text-green-600">導入済み</p>
          </div>
          <div className="text-center px-4 py-2 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-700">{considering}</p>
            <p className="text-xs text-yellow-600">検討中</p>
          </div>
          <div className="text-center px-4 py-2 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-500">{none}</p>
            <p className="text-xs text-slate-400">未導入</p>
          </div>
        </div>
      </div>
    </div>
  )
}
