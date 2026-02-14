export default function Badge({ label, color = '#0f766e' }) {
  return (
    <span
      style={{
        backgroundColor: `${color}26`,
        color: color,
      }}
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
    >
      {label}
    </span>
  )
}
