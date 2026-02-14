import { useState } from 'react'
import ProgressBar from '../ui/ProgressBar'
import Badge from '../ui/Badge'
import { useToast } from '../ui/Toast'
import { services } from '../../data'

export default function IssueAccordion({ issues }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-3 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-3">📌 課題一覧</h2>
      {issues.map((issue) => (
        <AccordionItem
          key={issue.id}
          issue={issue}
          isOpen={openId === issue.id}
          onToggle={() => setOpenId(openId === issue.id ? null : issue.id)}
        />
      ))}
    </div>
  )
}

function AccordionItem({ issue, isOpen, onToggle }) {
  const { showToast } = useToast()
  const matchingServices = services.filter((s) =>
    s.matchingIssueIds.includes(issue.id)
  )

  const priorityIndicator = issue.priority === 'high'
    ? '🔴 高'
    : '🟡 中'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm">{priorityIndicator}</span>
          <span className="font-semibold text-slate-800">{issue.title}</span>
        </div>
        <span className="text-slate-400 text-lg">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">{issue.description}</p>

          <div className="max-w-md">
            <ProgressBar
              label={issue.kpiLabel}
              current={issue.kpiCurrent}
              target={issue.kpiTarget}
            />
          </div>

          <div className="flex gap-2">
            <Badge label={issue.category.name} />
            <Badge label={issue.budgetSection.name} color="#64748b" />
          </div>

          {matchingServices.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                🔗 マッチするサービス ({matchingServices.length}件)
              </h4>
              <div className="space-y-3">
                {matchingServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="font-medium text-slate-800 text-sm">{svc.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{svc.companyName}</p>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{svc.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => showToast(`「${svc.title}」の詳細ページへ遷移します（MVP）`)}
                          className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                        >
                          詳細を見る
                        </button>
                        <button
                          onClick={() => showToast(`「${svc.companyName}」にオファーを送信しました（MVP）`)}
                          className="text-xs px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          オファーを送る
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
