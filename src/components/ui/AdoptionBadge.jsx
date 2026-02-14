const statusConfig = {
  adopted: { label: '✓ 導入済み', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  considering: { label: '検討中', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  none: { label: '未導入', bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-300' },
}

export default function AdoptionBadge({ status }) {
  const config = statusConfig[status] || statusConfig.none
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  )
}
