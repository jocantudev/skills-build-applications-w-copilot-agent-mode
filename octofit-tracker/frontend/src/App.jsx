import { useMemo } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { getApiBaseUrl } from './config/api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const baseUrl = useMemo(() => getApiBaseUrl(), [])

  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/activities', label: 'Activities' },
    { to: '/teams', label: 'Teams' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Presentation tier dashboard</h1>
          <p className="lede">
            Browse each API resource through React Router pages. The frontend
            targets the backend API on port 8000 using Vite environment
            variables when available.
          </p>
        </div>

        <div className="base-url">API base: {baseUrl}</div>
      </section>

      {!codespaceName ? (
        <div className="error-banner">
          VITE_CODESPACE_NAME is not set. Using a safe fallback URL so requests
          do not resolve to undefined hosts.
        </div>
      ) : null}

      <section className="panel">
        <nav className="resource-nav nav nav-pills gap-2" aria-label="API resources">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-dark bg-light border'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </section>

      <section className="content-grid content-grid-single">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </section>
    </main>
  )
}

export default App
