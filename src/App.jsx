import { useState } from 'react'
import Header from './components/Header'
import { ToastProvider } from './components/ui/Toast'
import CompanyDashboard from './components/company/CompanyDashboard'

function App() {
  const [activeRole, setActiveRole] = useState('company')

  const labels = {
    municipality: '自治体ダッシュボード (実装予定)',
    council: '議員ダッシュボード (実装予定)',
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Header activeRole={activeRole} onRoleChange={setActiveRole} />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeRole === 'company' && <CompanyDashboard />}
          {activeRole !== 'company' && (
            <p className="text-lg text-slate-500">{labels[activeRole]}</p>
          )}
        </main>
      </div>
    </ToastProvider>
  )
}
export default App
