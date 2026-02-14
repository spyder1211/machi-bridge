import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [activeRole, setActiveRole] = useState('company')

  const labels = {
    company: '企業ダッシュボード (実装予定)',
    municipality: '自治体ダッシュボード (実装予定)',
    council: '議員ダッシュボード (実装予定)',
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header activeRole={activeRole} onRoleChange={setActiveRole} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-lg text-slate-500">{labels[activeRole]}</p>
      </main>
    </div>
  )
}
export default App
