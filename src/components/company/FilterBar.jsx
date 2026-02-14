import { municipalities, categories, budgetSections } from '../../data'

const priorities = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
]

export default function FilterBar({ filters, onFilterChange }) {
  const prefectures = [...new Set(municipalities.map((m) => m.prefecture))]

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const selectClass =
    'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500'

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        className={selectClass}
        value={filters.prefecture}
        onChange={(e) => handleChange('prefecture', e.target.value)}
      >
        <option value="">都道府県：すべて</option>
        {prefectures.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.category}
        onChange={(e) => handleChange('category', e.target.value)}
      >
        <option value="">カテゴリ：すべて</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.budgetSection}
        onChange={(e) => handleChange('budgetSection', e.target.value)}
      >
        <option value="">予算款：すべて</option>
        {budgetSections.map((b) => (
          <option key={b.code} value={b.code}>{b.name}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.priority}
        onChange={(e) => handleChange('priority', e.target.value)}
      >
        <option value="">優先度：すべて</option>
        {priorities.map((p) => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
    </div>
  )
}
