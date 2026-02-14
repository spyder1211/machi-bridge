const tabs = [
  { key: 'company', icon: '🏢', label: '企業ダッシュボード', catchphrase: '自治体の課題から、刺さる提案を見つける' },
  { key: 'municipality', icon: '🏛', label: '自治体ダッシュボード', catchphrase: '課題にマッチした企業サービスでKPI達成へ' },
  { key: 'council', icon: '🎓', label: '議員ダッシュボード', catchphrase: '地域課題と解決策を整理して、予算案の根拠に' },
]

export default function Header({ activeRole, onRoleChange }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-teal-700">まちブリッジ</span>
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = activeRole === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => onRoleChange(tab.key)}
                className={`px-4 py-2 rounded-t text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-700 text-white border-b-2 border-teal-700'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{tab.icon} {tab.label}</span>
                <p className={`text-xs mt-0.5 ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                  「{tab.catchphrase}」
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
