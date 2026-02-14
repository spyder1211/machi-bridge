export default function SummaryCard({ value, label, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 transition-shadow hover:shadow-lg">
      {icon && <span className="text-3xl">{icon}</span>}
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
      </div>
    </div>
  )
}
