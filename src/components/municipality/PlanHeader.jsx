export default function PlanHeader({ planName, direction }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        📋 {planName}
      </h2>
      <p className="text-slate-600 leading-relaxed">{direction}</p>
    </div>
  )
}
