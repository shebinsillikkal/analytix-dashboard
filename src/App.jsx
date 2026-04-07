/**
 * AnalytiX Dashboard — Main App
 * Author: Shebin S Illikkal | Shebinsillikkal@gmail.com
 */
import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useLiveData } from './hooks/useLiveData'
import './App.css'

export default function App() {
  const [activeView, setActiveView] = useState('overview')
  const [dateRange, setDateRange] = useState('7d')
  const { data, connected } = useLiveData(dateRange)

  return (
    <div className="app">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="main-area">
        <Header connected={connected} dateRange={dateRange} onDateRangeChange={setDateRange} />
        <Dashboard view={activeView} data={data} />
      </div>
    </div>
  )
}
