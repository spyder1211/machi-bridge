import { useState } from 'react'
import Header from './components/Header'
import { ToastProvider } from './components/ui/Toast'
import CompanyDashboard from './components/company/CompanyDashboard'
import MunicipalityDashboard from './components/municipality/MunicipalityDashboard'
import CouncilDashboard from './components/council/CouncilDashboard'

function App() {
  const [activeRole, setActiveRole] = useState('company')
  const [visible, setVisible] = useState(true)
  const [displayedRole, setDisplayedRole] = useState('company')

  const handleRoleChange = (newRole) => {
    if (newRole === activeRole) return
    setVisible(false)
    setTimeout(() => {
      setActiveRole(newRole)
      setDisplayedRole(newRole)
      setVisible(true)
    }, 200)
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Header activeRole={activeRole} onRoleChange={handleRoleChange} />
        <main className={`max-w-7xl mx-auto px-4 py-8 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {displayedRole === 'company' && <CompanyDashboard />}
          {displayedRole === 'municipality' && <MunicipalityDashboard />}
          {displayedRole === 'council' && <CouncilDashboard />}
        </main>
      </div>
    </ToastProvider>
  )
}
export default App
